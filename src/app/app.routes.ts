/**
 * Created by gerlie on 6/2/17.
 */
import { Routes } from '@angular/router';

import { ManagementComponent } from './management/management.component';
import { UsageComponent } from './usage/usage.component';
import { AuthlogsComponent } from './authlogs/authlogs.component';
import { ServicehistoryComponent } from './servicehistory/servicehistory.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AuthManager } from './auth';
import { LoginComponent } from './login';

export const appRoutes: Routes = [
    {
        path:'home',
        canActivate: [AuthManager],
        component: ManagementComponent
    },
    {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
    },
     {
        path:'usage',
         canActivate: [AuthManager],
        component: UsageComponent
    },
    {
        path:'authlogs',
        canActivate: [AuthManager],
        component: AuthlogsComponent
    },
    {
        path:'servicehistory',
        canActivate: [AuthManager],
        component: ServicehistoryComponent
    },
    {
        path:'login',
        canActivate: [AuthManager],
        component: LoginComponent
    },
    {
        path:'accounts',
        canActivate: [AuthManager],
        component: AccountsComponent
    }

];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);