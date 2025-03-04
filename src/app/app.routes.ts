import { Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HomeComponent } from './home/home.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

export const routes: Routes = [
    {
        path:'',component: FileUploadComponent,
    },
    {
        path: 'register',component: RegisterFormComponent,
    },

];
