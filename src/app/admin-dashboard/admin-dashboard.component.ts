import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileComponent } from "../profile/profile.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NzTabsModule,
    ProfileComponent,
    NzLayoutModule,
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
