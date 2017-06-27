import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: 'login.component.html',
    //styleUrls: ['../login/login.component.css']
})
export class LoginComponent implements OnInit {
    localUser = {
        username: '',
        password: ''
    };

    constructor(private auth: AuthService, private router: Router) {
        console.log('login component');
    }

    ngOnInit() {
        // reset login status
        this.auth.logout();
    }

    login() {
        console.log('localUser', this.localUser);
        let checknow = this.auth.authenticateNow(this.localUser);
        checknow.then((res) => {
            if (res) {
                console.log('login redirect to service management');
                this.router.navigate(['service/management']);
            } else {
                console.log('Invalid user');
            }
        });
    }

}