import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
// import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css'],
    providers: [ManagementService, FormBuilder]
})

export class ManagementComponent implements OnInit {
    managementForm : FormGroup;
    output: any;
    submittedForm: any;

    constructor(private router: Router, private managementService : ManagementService, private  fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
    }

    createForm(){
        this.managementForm = this.fb.group({
            username: ['', Validators.pattern('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}')],
            redirection: ['', Validators.pattern('\\b(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]')],
            static_ip: ['', Validators.pattern('([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})')],
            passwords: this.fb.group({
                password: ['', Validators.minLength(4)],
                confirmPassword: ['', Validators.minLength(4)],
            }, { validator: this.passwordMatchValidator })
        });

        this.managementForm.valueChanges.subscribe(data => {
            console.log('form changes', data)
            this.output = data
        })
    }



    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value
            ? null : {'mismatch': true};
    }

    submitForm(value: any):void{
        console.log('Reactive Form Data: ')
        console.log(value.passwords);
        this.submittedForm = this.managementForm.value;
        for (let i in this.managementForm.controls) {
            this.managementForm.controls[i].markAsTouched();
        }

        this.managementService.manageService(value).subscribe(res => {
            console.log('res:');
            console.log(res.body);
        });
    }

    ping(){
        this.managementService.ping().subscribe(accounts => {
            console.log(accounts);
        });
    }

    addService(){

    }

    updateService(){
        //check fields not blank
        //update fields not blank
    }

    deleteService(){

    }

    addGarden(){

    }

    deleteGarden(){

    }

    addShaping(){

    }

    deleteShaping(){

    }
}