import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {BackdropsComponent} from './elements/backdrops';
import {EmptyPageComponent} from './pages/empty-page';
import {ErrorPageComponent} from './pages/error-page';
import {Jumbotron1Component} from './elements/jumbotron-1';
import {Jumbotron2Component} from './elements/jumbotron-2';
import {LeftSidebar1Component} from './elements/left-sidebar-1';
import {Navbar1Component} from './elements/navbar-1';
import {RightSidebar1Component} from './elements/right-sidebar-1';
import {TopNavigation1Component} from './elements/top-navigation-1';
import {TopNavigation2Component} from './elements/top-navigation-2';
import {Messages} from './elements/messages';

//Radius
import {routing}  from './app.routing';
import {AuthManager, AuthService} from './auth';
import {AuthModule} from './auth/auth.module';
import {ManagementComponent} from './service/management';
import {UsageComponent} from './usage/usage.component';
import {AuthlogsComponent} from './authlogs/authlogs.component';
import {ServicehistoryComponent} from './servicehistory/servicehistory.component';
import {AccountsComponent} from './accounts/list';
import {LoginComponent} from './pages/login.component';
import { ServicedetailsComponent } from './servicedetails/view';
import { NavigationService } from './services/navigation.service';


@NgModule({
    declarations: [
        AppComponent,
        BackdropsComponent,
        EmptyPageComponent,
        ErrorPageComponent,
        Jumbotron1Component,
        Jumbotron2Component,
        LeftSidebar1Component,
        Navbar1Component,
        RightSidebar1Component,
        TopNavigation1Component,
        TopNavigation2Component,
        Messages,

        ManagementComponent,
        UsageComponent,
        AuthlogsComponent,
        ServicehistoryComponent,
        LoginComponent,
        AccountsComponent,
        ServicedetailsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing,
        AuthModule,
        ReactiveFormsModule,
        /*RouterModule.forRoot([
         { path: '', component: EmptyPageComponent },
         { path: 'pages/empty-page', component: EmptyPageComponent },
         { path: '**', component: ErrorPageComponent }
         ])*/
    ],
    providers: [AuthManager, AuthService, NavigationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
