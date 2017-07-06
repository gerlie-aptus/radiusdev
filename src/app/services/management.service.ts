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
    errorLogin = false;

    constructor(public authHttp: AuthHttp, private router: Router) {
        console.log('Display Main Form');
    }

    ping() {
        try {
            return this.authHttp.get(this.apiUrl + 'ping').map(res => res.json());
        } catch (err) {
            console.log("err:"+err);
        }
    }

    manageService(body: Object, apiUrl: string, method: string) {
        let bodyString = JSON.stringify(body);
        console.log('bodyString manageservice:'+bodyString);
        try {
                switch (method){
                    case 'post': {
                        return this.authHttp.post(apiUrl, bodyString).map(this.extractData).catch(this.handleError);
                    }
                    case 'get': {
                        return this.authHttp.get(apiUrl, bodyString).map(this.extractData).catch(this.handleError);
                    }
                    case 'put': {
                        return this.authHttp.put(apiUrl, bodyString).map(this.extractData).catch(this.handleError);
                    }
                    case 'delete':{
                        return this.authHttp.delete(apiUrl, bodyString).map(this.extractData).catch(this.handleError);
                    }

                }
        } catch (err) {
            console.log("err:"+err);
        }
    }

    createService(body: Object) {
        let bodyString = JSON.stringify(body);
        console.log('bodyString:'+bodyString);
        try {
            return this.authHttp.post(environment.apiUrl+'services', bodyString).map(this.extractData).catch((err) => { console.log(err); return Observable.throw(err); });
        } catch (err) {
            console.log("err:"+err);
        }
    }

    getServiceDetails(service_id: number){
        return this.authHttp.get(environment.apiUrl+'radius_service_id/'+service_id).map(this.extractData).catch((err) => { return Observable.throw(err); });
    }

    /*BRB: make it shared*/
    private extractData(res: Response) {
        console.log('extract:');
        console.log(res);
        let body = res.json();
        console.log('body extractdata services:');
        console.log(body);
        return body;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        console.error(error);
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }
}
