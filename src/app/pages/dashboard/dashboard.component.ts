import { Component, inject } from '@angular/core';
import { WidgetComponent } from "../../componets/widget/widget.component";
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [WidgetComponent],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  store = inject(DashboardService); //inject service de los widgets
}
