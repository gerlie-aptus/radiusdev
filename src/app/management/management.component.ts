import { Component, OnInit } from '@angular/core';
import { ManagementService } from '../services/management.service';
// import {environment} from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css'],
    providers: [ManagementService]
})

export class ManagementComponent implements OnInit {

    constructor(private router: Router, private managementService : ManagementService) {

    }

    ngOnInit() {

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