import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';

export const routes: Routes = [
    {
        path:'',component: HomeComponent,
    },
    {
        path: 'register',component: RegisterFormComponent,
    },

];
