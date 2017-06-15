import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ManagementComponent } from './management/management.component';
import { UsageComponent } from './usage/usage.component';
import { AuthlogsComponent } from './authlogs/authlogs.component';
import { ServicehistoryComponent } from './servicehistory/servicehistory.component';
import { LoginComponent } from './login/login.component';
import { routing }  from './app.routing';
import { AuthManager, AuthService } from './auth';
import { AccountsComponent } from './accounts/accounts.component';

import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        ManagementComponent,
        UsageComponent,
        AuthlogsComponent,
        ServicehistoryComponent,
        LoginComponent,
        AccountsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AuthModule,
        ReactiveFormsModule
    ],
    providers: [AuthManager, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}

