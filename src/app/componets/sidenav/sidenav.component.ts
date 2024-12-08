import { Component, computed, Input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
//ANGULAR MATERIAL
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

//types del menu lateral
export type MenuItem = {
  icon : string,
  label : string,
  route? : string
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent  {
  
  //estado del menu lateral
   sideNavCollapsed = signal(false);
  router: any;
   @Input() set collapsed(val: boolean) {
     this.sideNavCollapsed.set(val);
   }
  
  logoPicSize = computed(() => this.sideNavCollapsed() ? "32" : "100");
  
  //opciones del menu lateral
  menuItems = signal<MenuItem[]>([
    {
      icon: "dashboard",
      label: "Dashboard",
      route: "dashboard",
    },
    {
      icon: "person",
      label: "Usuarios",
      route: "user",
    },
    {
      icon: "support_agent",
      label: "Servicios",
      route: "serviceOrder",
    },
    
  ]);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
