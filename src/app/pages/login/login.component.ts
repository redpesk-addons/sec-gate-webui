import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AfbWsService } from '../services/afb-ws.service';

@Component({
  selector: 'afb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  session$!: Observable<any>;
  idpList$: Observable<any>;

  idpList = false;
  register = false;
  loginSuccess = false;
  loginFail = false;
  loginPasswd = false;
  default = '0';

  constructor(
    private afbWS: AfbWsService,
    private render: Renderer2,
    private route: ActivatedRoute
  ) {

    this.route.queryParamMap.pipe(
      take(1),
      map((queryParams: Params) => {

        if (queryParams.params.action === 'login') {
          this.idpList = true;
        } else if (queryParams.params.action === 'register') {
          this.idpList = false;
          this.register = true;
        } else if (queryParams.params.action === 'passwd') {
          this.loginPasswd = true;
        }
        return;
      })
    ).subscribe();

    this.idpList$ = this.afbWS.idpList().pipe(
      map((list) => {
        list.idps.map((account: any, index: number) => {
          account.selected = index === 0 ? true : false;
          return account;
        });

        return list;
      })
    );

    this.session$ = this.afbWS.getSession().pipe(
      map((data: any) => {
        this.afbWS.setUser(`${data[0]?.pseudo}@${data[1]?.idp}:${data[2]?.loa}/${data[2]?.uid}`);
        return data;
      })
    );
  }

  ngOnInit(): void { }

  signIn(uid: any, sessions: any, div: HTMLDivElement): void {

    sessions.idps.map((session: any) => {
      session.selected = false;
      uid.selected = true;
    });

  }

  goToidpList(): void {
    this.idpList = true;
    this.register = false;
    this.loginPasswd = false;
  }

  goToSlash(): void {
    window.location.href = '/';
  }

  doLogin(form: NgForm): void {
    if (Object.keys(form.form.value).length > 0) {
      window.location.href = form.form.value['loginUrl'];
    }
  }

  doRegister(form: NgForm): void {
    if (Object.keys(form.form.value).length > 0) {
      let args: any = {};
      Object.entries(form.form.value).forEach(([index, value]) => {
        args[index] = value;
      });

      this.afbWS.usrRegister(args).pipe(
        map((resp: any) => {
          console.log('registration component', resp);

          this.register = false;
          if (resp.url) {
            window.location.href = resp.url;
          } else {
            this.loginFail = true;
          }
        })
      ).subscribe();

    }
  }

  doPasswd(form: NgForm): void {
    if (Object.keys(form.form.value).length > 0) {
      const args: any = [];
      Object.entries(form.form.value).forEach(([index, value]) => {
        args.push(value);
      });
      this.afbWS.newLoginPassword(args).pipe(
        map((resp: any) => {

          this.loginPasswd = false;

          if (resp === 'success') {
            this.loginSuccess = true;
          } else {
            this.loginFail = true;
          }

        })
      ).subscribe();

    }
  }

  check(form: NgForm): boolean | null {
    return Object.keys(form.form.value).length > 0 ? null : true;
  }

  checkLogin(type: string, inputL: HTMLInputElement, inputP: HTMLInputElement, form: NgForm): void {

    if (type === 'login') {
      if (inputL.value === '') {
        this.render.removeClass(inputL, 'is-valid');
        this.render.setAttribute(inputL?.parentElement?.nextElementSibling?.querySelector('input'), 'readonly', 'true');
        this.render.setAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'readonly', 'true ');
        return;
      }
      this.afbWS.checkLoginPasswd({ 'login': inputL.value }).pipe( // { attr: email, value: value }
        take(1),
        map((resp: any) => {
          if (resp === 'success') {
            form.form.setErrors(null);
            this.render.removeClass(inputL, 'is-invalid');
            this.render.addClass(inputL, 'is-valid');
            this.render.removeAttribute(inputL?.parentElement?.nextElementSibling?.querySelector('input'), 'readonly');

          } else {
            this.render.removeClass(inputL, 'is-valid');
            this.render.addClass(inputL, 'is-invalid');
          }
        })
      ).subscribe();
    } else if (type === 'password') {
      if (inputP.value === '') {
        this.render.removeClass(inputP, 'is-valid');
        this.render.setAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'disabled', 'true');
        return;
      }
      this.afbWS.checkLoginPasswd({ 'login': inputL.value, 'passwd': inputP.value }).pipe( // { attr: email, value: value }
        take(1),
        map((resp: any) => {
          if (resp === 'success') {
            form.form.setErrors(null);
            this.render.removeClass(inputP, 'is-invalid');
            this.render.addClass(inputP, 'is-valid');
            this.render.removeAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'disabled');

          } else {
            this.render.removeClass(inputP, 'is-valid');
            this.render.addClass(inputP, 'is-invalid');
          }
        })
      ).subscribe();
    }

  }

  checkAttribute(type: string, value: string, input: any, form: any): void {
    form.form.setErrors({ 'invalid': true });
    if (type === 'email' && !value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      this.render.removeClass(input, 'is-valid');
      this.render.addClass(input, 'is-invalid');
      return;
    }
    this.afbWS.checkAttribute({ attr: type, value: value }).pipe( // { attr: email, value: value }
      take(1),
      map((resp: any) => {
        if (resp === 'success') {
          form.form.setErrors(null);
          this.render.removeClass(input, 'is-invalid');
          this.render.addClass(input, 'is-valid');
        } else {
          this.render.removeClass(input, 'is-valid');
          this.render.addClass(input, 'is-invalid');
        }
      })
    ).subscribe();
  }

  enterKey(event: any): boolean {
    if (event.target.type === 'submit') {
      return true;
    }

    return false;

  }

}
