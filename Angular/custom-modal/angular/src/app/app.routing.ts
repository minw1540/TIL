import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { TestPageComponent } from './test-page/index';

const routes : Routes = [
    { path : '' , component : HomeComponent },
    { path : 'test-page' , component : TestPageComponent },
    { path : '**' , redirectTo : '' }
];

export const routing = RouterModule.forRoot(routes);

