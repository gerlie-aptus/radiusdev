import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
// import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css'],
    providers: [ManagementService]
})

export class ManagementComponent implements OnInit {
    managementForm : FormGroup;


    constructor(private router: Router, private managementService : ManagementService, private  fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {

    }

    createForm(){
        this.managementForm = this.fb.group({
            username: ['', Validators.required ],
            password: '',
            confirmPassword: '',
            redirection: '',
            static_ip: ''
        });
    }

    submitForm(value: any):void{
        console.log('Reactive Form Data: ')
        console.log(value);
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

    logout(){
        window.localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}