

import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [MenuModule, BadgeModule, RippleModule, AvatarModule,RouterLink]
})
export class HomeComponent implements OnInit {
    items: MenuItem[] | undefined;
    private router = inject(Router);

    logout() {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }

    ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Administrar',
                items: [
                    {
                        label: 'Nuevo Usuario',
                        icon: 'pi pi-plus',
                        routerLink: '/createuser'
                    },
                    {
                        label: 'Listar Usuarios',
                        icon: 'pi pi-search',
                        command: () => {
                            this.router.navigate(['../tableuser']);
                          
                        } 
                        
                    }
                ]
            },
            {
                label: 'Oden',
                items: [
                    {
                        label: 'Crear Oden',
                        icon: 'pi pi-cog',
                        
                    },
                    {
                        label: 'Consultar Odenes',
                        icon: 'pi pi-inbox',
                        
                    },
                ]
            },
            {
                separator: true
            },
            {
                label: 'Cuenta',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: () => {
                          this.logout();
                      }
                        
                    }
                ]
            },
        ];
    }
}