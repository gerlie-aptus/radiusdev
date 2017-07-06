/**
 * Created by gerlie on 6/2/17.
 */
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthManager implements CanActivate {
    token : string;

    constructor(private router: Router, private jwtHelper: JwtHelper) {
        this.token = localStorage.getItem('token');
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = localStorage.getItem('token');
        if(next.url[0].path == 'login'){
            if(this.token && tokenNotExpired('token')){
                console.log('You are already logged in');
                return false;
            }
            else {
                return true;
            }
        }

        if(this.token && tokenNotExpired('token')) {
            console.log("Token expiration:"+this.jwtHelper.getTokenExpirationDate(this.token) );

            return true;
        }


        console.log('You must be logged in');

        this.router.navigate(['/pages/login'] , { queryParams: { returnUrl: state.url }} );
        return false;
    }

}