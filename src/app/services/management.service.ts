import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ManagementService {
    apiUrl = environment.apiUrl;

    constructor(public authHttp: AuthHttp, private router: Router) {
        console.log('Display Main Form');
    }

    ping() {
        try {
            if(tokenNotExpired('token')){
                return this.authHttp.get(this.apiUrl + 'ping').map(res => res.json());
            } else {
                console.log('Token is expired. ms');
                this.router.navigate(['/pages/login']);
            }
        } catch (err) {
            console.log("err:"+err);
        }
    }

    manageService(body: Object) {
        let bodyString = JSON.stringify(body);

        console.log(bodyString);
        try {
            if(tokenNotExpired('token')){
                return this.authHttp.post(this.apiUrl + 'service/manage', bodyString)
                                    .map(this.extractData)
                                    .catch(this.handleError);
            } else {
                console.log('Token is expired.');
                this.router.navigate(['/pages/login']);
            }
        } catch (err) {
            console.log("err:"+err);
        }
    }


    /*BRB: make it shared*/
    private extractData(res: Response) {
        console.log('extract:');
        //let body = res.json();
        let body = res.json();
        console.log(body);
        // return body.data || { };
        return body;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
