import { RouterModule } from "@angular/router";
import { ModuleWithProviders }  from '@angular/core';

import { appRoutes } from './app.routes';

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });