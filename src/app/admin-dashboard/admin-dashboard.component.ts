import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProfileComponent } from "../profile/profile.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { UserListComponent } from "../user-list/user-list.component";
import { TicketListComponent } from "../components/ticket-list/ticket-list.component";
import { TicketAssignmentComponent } from "../components/ticket-assignment/ticket-assignment.component";
import { TicketsAssignedToMeComponent } from "../components/tickets-assigned-to-me/tickets-assigned-to-me.component";
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    NzTabsModule,
    ProfileComponent,
    NzLayoutModule,
    UserListComponent,
    TicketListComponent,
    TicketAssignmentComponent,
    TicketsAssignedToMeComponent,
    NzSpinModule
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  isLoaded = false;
  ngOnInit() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 2000);
  }
}
