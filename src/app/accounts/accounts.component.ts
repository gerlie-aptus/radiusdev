import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../services/accounts.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css'],
    providers: [AccountsService]
})
export class AccountsComponent implements OnInit {
    accounts: Account[];

    constructor(private accountsService: AccountsService) {
        this.getAccounts();
    }

    ngOnInit() {

    }

    getAccounts() {
        this.accountsService.getAccounts().subscribe(accounts => {
            this.accounts = accounts;
            console.log(this.accounts);
        });
    }

}
