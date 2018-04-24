import { RouterModule, Routes } from '@angular/router';

/*import Component*/
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes : Routes = [
    { path : '' , component : LoginComponent },
    { path : 'register' , component : RegisterComponent },
    { path : 'home' , component : HomeComponent }
];

export const AppRouting = RouterModule.forRoot(routes);