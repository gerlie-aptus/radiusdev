import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AccountsService {
    apiUrl = environment.apiUrl;

    constructor(private http: Http, public authHttp: AuthHttp) {

    }

    getAccounts() {
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');

        try {
            if(tokenNotExpired('token')){
                return this.authHttp.get(this.apiUrl + 'accounts', { headers: myHeader }).map(res => res.json());
            } else {
                console.log('Token is expired');
            }
        } catch (err) {
            console.log("err:"+err);
        }
    }
}
