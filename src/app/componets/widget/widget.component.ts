import { Component, input } from '@angular/core';
import { widget } from '../../modelsWidgets/dashboard';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.css'
})
export class WidgetComponent {
   data = input.required<widget>();
   
}
