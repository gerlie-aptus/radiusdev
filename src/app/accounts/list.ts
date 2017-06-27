import {Component, OnInit} from '@angular/core';
import {AccountsService} from '../services/accounts.service';

@Component({
    selector: 'app-accounts',
    templateUrl: 'list.html',
    styleUrls: ['accounts.css'],
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
            this.accounts = accounts.body;
            console.log(this.accounts);
        });
    }

}
