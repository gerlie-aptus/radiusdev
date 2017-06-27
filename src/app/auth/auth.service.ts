/**
 * Created by gerlie on 6/2/17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {environment} from '../../environments/environment';

import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

    isAuthenticated: boolean = false;
    apiUrl = environment.apiUrl;

    constructor(private http: Http) {}

    authenticateNow(usercreds) {
        var headers = new Headers();
        var creds = 'email=' + usercreds.username + '&password=' + usercreds.password;

        headers.append('Content-Type', 'application/X-www-form-urlencoded');

        return new Promise((resolve) => {
            this.http.post(this.apiUrl+'login_user', creds, {headers: headers}).subscribe((data) => {
                    let response = data.json();
                    if(data.json().success) {
                        window.localStorage.setItem('token', response.token);
                        this.isAuthenticated = true;}
                    resolve(this.isAuthenticated);
                },
                error => console.error(error),
                () => console.log('login#done')
            )
        });
    }

    loggedIn() {
        return tokenNotExpired();
    }

    logout() : void {
        window.localStorage.removeItem('token');
    }
}
