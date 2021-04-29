import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AfbWsService } from '../services/afb-ws.service';

@Component({
  selector: 'afb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  session$!: Observable<any>;

  constructor(
    private afbWS: AfbWsService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {

    this.session$ = this.afbWS.getSession().pipe(
      map((data: any) => {
        this.afbWS.setUser(`${data[0]?.pseudo}@${data[1]?.idp}:${data[2]?.loa}/${data[2]?.uid}`);
        return data;
      })
    );
  }

  goToidpList(){
    window.location.href = '/private';
  }

  checkAttribute(type: string, value: string, input: any, form: any): void {
    form.form.setErrors({ 'invalid': true });
    if (type === 'email' && !value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      this.renderer.removeClass(input, 'is-valid');
      this.renderer.addClass(input, 'is-invalid');
      return;
    }
    this.afbWS.checkAttribute({ label: type, value: value }).pipe( // { attr: email, value: value }
      take(1),
      map((resp: any) => {
        if (resp === 'success') {
          form.form.setErrors(null);
          this.renderer.removeClass(input, 'is-invalid');
          this.renderer.addClass(input, 'is-valid');
        } else {
          this.renderer.removeClass(input, 'is-valid');
          this.renderer.addClass(input, 'is-invalid');
        }
      })
    ).subscribe();
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
          if (resp.target) {
            window.location.href = resp.target;
          } else {
            // Treat error: message, redirect?
          }
        })
      ).subscribe();

    }
  }

}
