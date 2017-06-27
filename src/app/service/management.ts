import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';

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


    constructor(private router: Router, private managementService : ManagementService, private  fb: FormBuilder) {
        console.log('management component');
        this.createForm();
    }

    ngOnInit() {
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
            shape: ''
        });
    }

/*    checkUsername(control: AbstractControl){
        console.log('username:' + control.value);
        if(control.value != '') {
            return control.setValidators([Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')]);
        }
    }*/

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

        this.managementService.manageService(value).subscribe(res => {
            console.log('res:');
            console.log(res);
            this.response = res;

            if (res.messages) {
                this.displayErrors(res);
            } // else {
                this.displaySuccess(res);
                //this.managementForm.reset();
           // }
        }, errorMsg => {
            this.displayErrors(errorMsg);
        });
    }

    displayErrors(res) {
        console.log("error:");
        var messages = res.messages;

        for (let key of Object.keys(messages)) {
            let errors = messages['errors'];

            for (let key of Object.keys(errors)) {
                let fieldError = errors[key];
                console.log(fieldError.description);
                this.managementForm.controls[key].setErrors({ remote: fieldError.description });
            }

        }
    }

    displaySuccess(res){
        for (let key of Object.keys(res)) {
            console.log(key);
            let fieldObj = res[key];
            console.log(fieldObj);

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

                }
            }

            // this.managementForm.controls[key].setErrors({ remote: fieldName.description });
        }

        console.log('reponse:');
        console.log(this.response);
    }

    getTypeOf(val) { return typeof val; }



    ping(){
        this.managementService.ping().subscribe(accounts => {
            console.log(accounts);
        });
    }
}