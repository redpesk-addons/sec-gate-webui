import { Component, OnInit, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AfbWsService } from '../../services/afb-ws.service';

@Component({
  selector: 'afb-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  private state = '';
  errorMessage!: string;

  constructor(
    private afbWS: AfbWsService,
    private renderer: Renderer2,
    private route: Router,
    private location: Location
    ) {
      const match = this.route.url.match(/state=+[^&]*/);

      if (match) {
        this.state = match[0].replace('state=', '');
      } else {
        console.error('Problem getting state from url');

      }
    }

  ngOnInit(): void {
  }

  enterKey(event: any): boolean {
    if (event.target.type === 'submit') {
      return true;
    }
    return false;
  }

  disableBtn(button: HTMLButtonElement) {
    if (!button.hasAttribute('disabled')) {
      button.disabled = true;
    }
  }

  checkLogin(type: string, inputL: HTMLInputElement, inputP: HTMLInputElement, form: NgForm): void {

    if (type === 'login') {
      if (inputL.value === '') {
        this.renderer.removeClass(inputL, 'is-valid');
        this.renderer.setAttribute(inputL?.parentElement?.nextElementSibling?.querySelector('input'), 'readonly', 'true');
        this.renderer.setAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'readonly', 'true ');
        return;
      }
      this.afbWS.checkLoginPasswd({ login: inputL.value, state: this.state }).pipe( // { attr: email, value: value }
        take(1),
        map((resp: any) => {
          if (resp.request.status === 'success') {
            form.form.setErrors(null);
            this.renderer.removeClass(inputL, 'is-invalid');
            this.renderer.addClass(inputL, 'is-valid');
            this.renderer.removeAttribute(inputL?.parentElement?.nextElementSibling?.querySelector('input'), 'readonly');

          } else {
            this.errorMessage = resp.response.toString();
            this.renderer.removeClass(inputL, 'is-valid');
            this.renderer.addClass(inputL, 'is-invalid');
          }
        })
      ).subscribe();
    } else if (type === 'password') {
      if (inputP.value === '') {
        this.renderer.removeClass(inputP, 'is-valid');
        this.renderer.setAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'disabled', 'true');
        return;
      }
      this.afbWS.checkLoginPasswd({ login: inputL.value, passwd: inputP.value, state: this.state }).pipe( // { attr: email, value: value }
        take(1),
        map((resp: any) => {
          if (resp.request.status === 'success') {
            form.form.setErrors(null);
            this.renderer.removeClass(inputP, 'is-invalid');
            this.renderer.addClass(inputP, 'is-valid');
            this.renderer.removeAttribute(inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn'), 'disabled');
            (inputP.parentElement?.nextElementSibling?.querySelector('#lgnBtn') as HTMLButtonElement)?.focus();


          } else {
            this.renderer.removeClass(inputP, 'is-valid');
            this.renderer.addClass(inputP, 'is-invalid');
          }
        })
      ).subscribe();
    }

  }

  goToidpList(){
      this.location.back();
  }

  doPasswd(form: NgForm): void {
    if (Object.keys(form.form.value).length > 0) {
      const args: any = {};
      Object.entries(form.form.value).forEach(([index, value]) => {
        args[index] = value;
      });
      args.state = this.state;
      this.afbWS.checkLoginPasswd(args).pipe(
        map((resp: any) => {
          if (resp?.request?.status === 'success' && resp?.response?.target) {
            return window.location.href = resp?.response?.target
          }
        })
      ).subscribe();
    }
  }

}
