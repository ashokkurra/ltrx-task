import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable, ReplaySubject } from 'rxjs';


@Injectable()
export class TaskLoginAuthGuard implements CanActivate {
    private _isLoggedIn$ = new ReplaySubject<boolean>(1);
    get isLoggedIn$() { return this._isLoggedIn$.asObservable(); }
    constructor() {
        if (localStorage.getItem('AccessToken') != "") {           
            this._isLoggedIn$.next(true);
            this._isLoggedIn$.complete();
        } else {
            this._isLoggedIn$.next(false);
            this._isLoggedIn$.complete();
        }

    }

    canActivate() {
        return this.isLoggedIn$;
    }

}