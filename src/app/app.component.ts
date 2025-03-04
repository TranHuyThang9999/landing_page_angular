import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterFormComponent } from "./register-form/register-form.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-first-angular-app';
}
