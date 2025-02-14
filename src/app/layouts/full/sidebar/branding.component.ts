import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
        <img
          src="./assets/images/logos/loguito.svg"
          class="align-middle m-2 m=t=12"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
