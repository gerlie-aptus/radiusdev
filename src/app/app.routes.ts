/**
 * Created by gerlie on 6/2/17.
 */
import { Routes } from '@angular/router';

import { AuthManager } from './auth';
import { LoginComponent } from './pages/login.component';

import { AccountsComponent } from './accounts/list';
import { ManagementComponent } from './service/management';
import { UsageComponent } from './usage/usage.component';
import { AuthlogsComponent } from './authlogs/authlogs.component';
import { ServicehistoryComponent } from './servicehistory/servicehistory.component';

import {EmptyPageComponent} from './pages/empty-page';
import { ErrorPageComponent } from './pages/error-page';

export const appRoutes: Routes = [
    {
        path: 'pages/empty-page',
        component: EmptyPageComponent
    },
    {
        path:'service/management',
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
    { path: '**', component: ErrorPageComponent },
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);