import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { TopmenuComponent } from "../components/topmenu/topmenu.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HomeComponent, RouterOutlet, TopmenuComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export default class LayoutComponent {

}
