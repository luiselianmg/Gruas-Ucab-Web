import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppRecentOrdersComponent } from 'src/app/components/recent-orders/recent-orders.component';
import { AppDepartmentsComponent } from 'src/app/components/departments/departments.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppRecentOrdersComponent,
    AppDepartmentsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }