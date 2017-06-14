import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ManagementService {
    apiUrl = environment.apiUrl;

    constructor(public authHttp: AuthHttp) {
        console.log('Display Main Form');
    }

    ping() {
        try {
            if(tokenNotExpired('token')){
                return this.authHttp.get(this.apiUrl + 'ping').map(res => res.json());
            } else {
                console.log('Token is expired');
            }
        } catch (err) {
            console.log("err:"+err);
        }
    }

}
