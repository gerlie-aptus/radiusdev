import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
    moduleId: module.id,
    selector: 'app-management',
    templateUrl: 'management.html',
    styleUrls: ['management.css'],
    providers: [ManagementService]
})

export class ManagementComponent implements OnInit {
    managementForm : FormGroup;
    output: any;
    submittedForm: any;
    response: any;
    error: any;
    info: string;
    service_id: number;
    apiUrl = environment.apiUrl;
    errorLogin: boolean;
    radius_service_id: number;
    existing_service: boolean;
    radius_billing_ref: string;
    success: string;


    constructor(private router: Router, private route: ActivatedRoute, private managementService : ManagementService, private  fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.existing_service = false;
        this.radius_billing_ref = null;
        this.errorLogin = false;
        this.error = '';

        this.route
            .params
            .subscribe(params => {
                this.service_id = params.service_id;

                //query radius_service_id. if not null, assign existing_service to true.
                this.managementService.getServiceDetails(this.service_id).subscribe(serviceDetails => {
                    console.log(serviceDetails);

                    if (serviceDetails.message) {
                        this.error = serviceDetails.message;
                        this.existing_service = false;
                    } else {
                        this.error = '';
                        if(serviceDetails.radius_service_id != null){
                            this.existing_service = true;
                            this.radius_service_id = 27;
                        } else {
                            this.info = "The service doesn't exist in Fabio system. The service will be saved to Radius upon submission.";
                            this.existing_service = false;
                        }
                        if(serviceDetails.billing_id != null){
                            this.radius_billing_ref = serviceDetails.billing_id;
                        }
                    }

                });
            });

        this.radius_service_id = 27;
    }

    createForm(){
        this.managementForm = this.fb.group({
            username: ['', Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
            // redirection: ['', Validators.pattern('\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]')],
            static_ip: ['', Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')],
            passwords: this.fb.group({
                password: ['', Validators.minLength(4)],
                confirmPassword: ['', Validators.minLength(4)],
            }, {validator: this.passwordMatchValidator}),
            ip_group: ['', Validators.maxLength(5)],
            garden: '',
            shape: '',
            kick_user: ''
        });
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value
            ? null : {'mismatch': true};
    }

    submitForm(value: any):void{
        console.log('Reactive Form Data: ');
        //console.log(value.passwords);
        /*this.submittedForm = this.managementForm.value;
        for (let i in this.managementForm.controls) {
            this.managementForm.controls[i].markAsTouched();
        }*/

        if(localStorage.getItem('token') && tokenNotExpired('token')) {
            this.apiRequest(value, this.apiUrl + 'service/manage/'+this.radius_service_id, 'post');
        } else {
            console.log('Token is expired.');
            this.errorLogin = true;
        }
    }

    deleteStaticIP(){
        this.apiRequest({}, this.apiUrl + 'service/'+this.radius_service_id+'/static_ip', 'delete');
    }

    deleteGarden(){
        this.apiRequest({}, this.apiUrl + 'service/'+this.radius_service_id+'/garden', 'delete');
    }

    deleteShape(){
        this.apiRequest({}, this.apiUrl + 'service/'+this.radius_service_id+'/shape', 'delete');
    }

    createService(body: Object) {
        body['user_services_id'] = this.service_id;
        body['sbr'] = this.radius_billing_ref;
        this.managementService.createService(body).subscribe(res => {
            console.log('create service return: ');
            if (res.messages) {
                this.error = res.messages['errors']['add_service']['description'];
            } else {
                this.success = "The service has been successfully created.";
                this.existing_service = true;
                this.initMessages();

                this.radius_service_id = res['add_service']['body']['id'];
            }
        }, errorMsg => {
            this.displayErrors(errorMsg);
        });
    }

    apiRequest(body: Object, apiUrl: string, method: string){
        if(this.existing_service){
            this.managementService.manageService(body, apiUrl, method).subscribe(res => {
                this.response = res;

                if (res.messages) {
                    this.displayErrors(res);
                }

                this.displaySuccess(res);

            }, errorMsg => {
                this.displayErrors(errorMsg);
            });
        } else {
            this.createService(body);
        }
    }

    displayErrors(res) {
        var messages = res.messages;

        for (let key of Object.keys(messages)) {
            let errors = messages['errors'];

            for (let key of Object.keys(errors)) {
                let fieldError = errors[key];
                this.managementForm.controls[key].setErrors({ remote: fieldError.description });
            }

        }
    }

    displaySuccess(res){
        for (let key of Object.keys(res)) {
            let fieldObj = res[key];
            if(fieldObj.statusCode >= 200 && fieldObj.statusCode < 300){
                switch (key){
                    case 'ip_group':
                        this.response['static_ip'] = fieldObj.body.assigned_ip;
                        break;
                    case 'password':
                        this.response['passwords'] = 'Password has been successfully updated.';
                        break;
                    case 'garden':
                        this.response['garden'] = 'Garden has been successfully added to the service.';
                        break;
                    case 'shape':
                        this.response['shape'] = 'Service has been successfully shaped.';
                        break;
                    case 'delete_staticip':
                        this.response['delete_staticip'] = 'Static IP has been deleted';
                        break;
                    case 'delete_garden':
                        this.response['delete_garden'] = 'Service Wall garden has been removed';
                        break;
                    case 'delete_shape':
                        this.response['delete_shape'] = 'Service shaping has been removed';
                        break;

                }
            }

            // this.managementForm.controls[key].setErrors({ remote: fieldName.description });
        }

        console.log('reponse:');
        console.log(this.response);
    }

    initMessages(){
        this.error = null;
        this.info = null;
    }

    getTypeOf(val) { return typeof val; }



    ping(){
        if(localStorage.getItem('token') && tokenNotExpired('token')) {
            this.managementService.ping().subscribe(accounts => {
                console.log(accounts);
            });
        } else {
            console.log('Ping: Token is expired.');
            this.errorLogin = true;
        }
    }
}