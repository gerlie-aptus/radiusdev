/**
 * Created by gerlie on 6/2/17.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthManager } from './auth';
import { LoginComponent } from './pages/login.component';

import { AccountsComponent } from './accounts/list';
import { ManagementComponent } from './service/management';
import { UsageComponent } from './usage/usage.component';
import { AuthlogsComponent } from './authlogs/authlogs.component';
import { ServicehistoryComponent } from './servicehistory/servicehistory.component';
import { ServicedetailsComponent } from './servicedetails/view';

import {EmptyPageComponent} from './pages/empty-page';
import { ErrorPageComponent } from './pages/error-page';

export const appRoutes: Routes = [
    {
        path: 'pages/empty-page',
        component: EmptyPageComponent
    },
    {
        path:'service/management/:service_id',
        canActivate: [AuthManager],
        component: ManagementComponent
    },
    /*{
        path:'',
        redirectTo: '/service/manage',
        pathMatch: 'full'
    },*/
     {
        path:'reports/usage', canActivate: [AuthManager],
        component: UsageComponent
    },
    {
        path:'logs/auth',
        canActivate: [AuthManager],
        component: AuthlogsComponent
    },
    {
        path:'logs/service-history',
        canActivate: [AuthManager],
        component: ServicehistoryComponent
    },
    {
        path:'pages/login',
        //canActivate: [AuthManager],
        component: LoginComponent
    },
    {
        path:'accounts/list',
        canActivate: [AuthManager],
        component: AccountsComponent
    },
    {
        path:'servicedetails/view/:service_id',
        canActivate: [AuthManager],
        component: ServicedetailsComponent
    },
    { path: '**', component: ErrorPageComponent },
];

// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);