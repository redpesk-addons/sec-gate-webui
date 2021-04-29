import { Injectable } from '@angular/core';
import { AFBWebSocketService } from 'afbwebsocket';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AfbWsService {

  user$ = new BehaviorSubject('anonymous');

  constructor(private afbService: AFBWebSocketService) {
    this.afbService.Init('api', 'HELLO');
    /**
     * Set afb-daemon url
     */
    if (environment.production) {
      this.afbService.SetURL(window.location.host);
    } else {
      this.afbService.SetURL('localhost', '1234');
    }

    /**
     * afb-daemon connection
     */
    this.afbService.Connect();

    /**
     * Listen for afb-daemon events
     */
    // this.afbService.Status$.pipe(
    //   map((x: any) => {
    //     console.log(x);
    //   })
    // ).subscribe();
  }

  get(): AFBWebSocketService {
    return this.afbService;
  }

  idpList(): Observable<any> {
    console.log('idp-list', 'sgate/idp-list');
    return this.afbService.Send('sgate/idp-list', '').pipe(
      map((d: any) => {
        console.log('idp-list resp', d);
        return d?.response;
      }));
  }

  getSession(): Observable<any> {
    console.log('get-session', 'sgate/session-get');
    return this.afbService.Send('sgate/session-get', '').pipe(
      map((d: any) => {
        console.log('get-session', d);
        return d?.response;
      }));
  }

  checkAttribute(args: any): Observable<any> {
    console.log('chk-attribute', 'sgate/chk-attribute', args);

    return this.afbService.Send('sgate/chk-attribute', args).pipe(
      map((d: any) => {
        console.log('chk-attribute', d);
        return d?.request?.status;
      }));
  }


  checkLoginPasswd(args: any): Observable<any> {
    console.log('pam-login', 'sgate/pam-login', args);

    return this.afbService.Send('sgate/pam-login', args).pipe(
      map((d: any) => {
        console.log('pam-login resp', d);
        return d;
      }));
  }


  usrRegister(args: any[]): Observable<any> {
    console.log('usr-register', 'sgate/usr-register', args);

    return this.afbService.Send('sgate/usr-register', args).pipe(
      map((d: any) => {
        console.log('usr-register', d);
        return d?.response;
      }));
  }

  // newLoginPassword(args: any[]): Observable<any> {
  //   console.log('pam-login', 'sgate/pam-login', args);

  //   return this.afbService.Send('sgate/pam-login', args).pipe(
  //     map((d: any) => {
  //       console.log('pam-login', d);
  //       if (d.response?.status.exit !== undefined) {
  //         return 'success';
  //       }
  //       return d?.response?.status;
  //     }));
  // }

  getUser(): Observable<string> {
    return this.user$;
  }

  setUser(user: string): void {
    this.user$.next(user);
  }
}
