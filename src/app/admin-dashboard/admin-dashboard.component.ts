import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileComponent } from "../profile/profile.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CreateTicketComponent } from '../components/create-ticket/create-ticket.component';
import { UserListComponent } from "../user-list/user-list.component";
import { TicketListComponent } from "../components/ticket-list/ticket-list.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NzTabsModule,
    ProfileComponent,
    NzLayoutModule,
    UserListComponent,
    TicketListComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
