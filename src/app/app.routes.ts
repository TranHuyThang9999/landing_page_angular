import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path:'',component: HomeComponent,
    },
    {
        path: 'register',component: RegisterFormComponent,
    },
    {
        path: 'login', component: LoginComponent,
    }

];
