import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//ANGULAR MATERIAL//
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule  } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
//COMPONENTES//
import { SidenavComponent  } from "../../componets/sidenav/sidenav.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    SidenavComponent,
  
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  //singnal para controlar el sidenav
  collapsed = signal(false);
  // si no estamos en modo compacto el ancho es 250px contrario 64px
  sidenavWidth = computed(() => this.collapsed() ? '64px' : '200px');
}
