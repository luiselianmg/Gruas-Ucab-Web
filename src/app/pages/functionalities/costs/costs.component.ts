import { Component } from '@angular/core';
import {
    NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'app-costs',
  standalone: true,
  imports: [
    TablerIconsModule,
    NgApexchartsModule, 
    MaterialModule, 
    TablerIconsModule,
  ],
  templateUrl: './costs.component.html',
})
export class AppCostsComponent {
  
}
