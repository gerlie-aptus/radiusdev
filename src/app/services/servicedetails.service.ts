import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class ServiceDetails {
    apiUrl = environment.apiUrl;



    constructor(private http: Http, public authHttp: AuthHttp) {

    }

    getFabioServiceDetails(fabio_service_id) {
        return this.authHttp.get(environment.apiUrl+'radius_service_id/'+fabio_service_id).map(this.extractData).catch((err) => { return Observable.throw(err); });
    }

    getRadiusServiceDetails(radius_service_id) {
        return this.authHttp.get(environment.apiUrl+'service/'+radius_service_id).map(this.extractData).catch((err) => { return Observable.throw(err); });
    }

    /*BRB: make it shared*/
    private extractData(res: Response) {
        let body = res.json();
        console.log('body extractdata service details:');
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
