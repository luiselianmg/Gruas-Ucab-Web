import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HasRoleDirective } from './directives/has-role.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Gruas UCAB';
}
