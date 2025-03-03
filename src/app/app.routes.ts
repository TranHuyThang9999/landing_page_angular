import { Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:'',component: AppComponent,
    },
    {
        path: 'register',component: RegisterFormComponent,
    }
];
