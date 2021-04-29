import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AfbWsService } from '../services/afb-ws.service';

@Component({
    selector: 'afb-idplist',
    templateUrl: './idplist.component.html',
    styleUrls: ['./idplist.component.scss']
})

export class IdpListComponent implements OnInit {

    idpList$: Observable<any>;
    list: any;
    default = '0';

    constructor(
        private afbWS: AfbWsService,
        private router: Router,
    ) {

        this.idpList$ = this.afbWS.idpList().pipe(
            map((list) => {
                list.idps.map((account: any, index: number) => {
                    account.selected = index === 0 ? true : false;
                    account.profils.map((profile: any, i: number) => {
                        profile.selected = i === 0 ? true : false;
                        profile.url = account['login-url'] + (account.uid === 'pam-login' ? '' : '?scope=' + profile.scope);
                        return profile;
                    });
                    return account;
                });
                this.list = list;
                return list;
            })
        );

    }

    ngOnInit(): void { }

    changeIdp(idp: any, event: any): void {
      if (['DIV', 'P'].indexOf(event.target?.tagName) !== -1) {
        this.list.idps.map((session: any) => {
          session.profils.forEach((profile: any) => {
            profile.selected = false;
          });
            session.selected = false;
          });
          const _idp = this.list.idps.find((_idp: any) => _idp === idp);
          if (_idp) {
            _idp.selected = true;
            _idp.profils[0].selected = true;
          }
          this.default = '0';
      }

    }

    check(form: NgForm): boolean | null {
        return Object.keys(form.form.value).length > 0 ? null : true;
    }

    setSelectedProfile(i: number, profiles: any[]) {
        profiles.forEach((element: any, index: number) => {
            if (i === index) {
                element.selected = true;
            } else {
                element.selected = false;
            }
        });
    }

    goToSlash(): void {
        window.location.href = '/';
    }

    /**
     * Submit form
     *
     * @param {NgForm} form
     * @memberof IdpListComponent
     */
    doLogin(form: NgForm): void {
        if (Object.keys(form.form.value).length > 0) {
          const keys = Object.keys(form.form.value)
          window.location.href = form.form.value[keys[1]];
        }
    }

}
