import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppRecentOrdersComponent } from 'src/app/components/recent-orders/recent-orders.component';
import { AppDepartmentsComponent } from 'src/app/components/departments/departments.component';
import { AuthService } from '../../services/auth.service'; 
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppRecentOrdersComponent,
    AppDepartmentsComponent,
    HasRoleDirective
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent implements OnInit {
  name: string | null = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.name = this.authService.getUsername();
  }
}
