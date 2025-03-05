import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path:'',component: HomeComponent,
    },
    {
        path: 'register',component: RegisterFormComponent,
    },
    {
        path: 'login', component: LoginComponent,
    },
    {
        path:'dashboard',component:AdminDashboardComponent,
    }
];
