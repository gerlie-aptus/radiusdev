import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth';
import {Router, ActivatedRoute} from '@angular/router';

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
    returnUrl: any;

    constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
        console.log('login component');
    }

    ngOnInit() {
        // reset login status
        this.auth.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        console.log('localUser', this.localUser);
        let checknow = this.auth.authenticateNow(this.localUser);
        checknow.then((res) => {
            if (res) {
                console.log('redirect:'+this.returnUrl);
                this.router.navigate([this.returnUrl]);
            } else {
                console.log('Invalid user');
            }
        });
    }

}