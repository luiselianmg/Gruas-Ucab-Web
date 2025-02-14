import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { HasRoleDirective } from 'src/app/directives/has-role.directive';

import { AppNotificationsComponent } from '../notifications/notifications.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, 
    CommonModule, 
    NgScrollbarModule, 
    TablerIconsModule, 
    MaterialModule, 
    MatDialogModule,
    HasRoleDirective,
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private authService: AuthService) {}
  
  openNotificationsDialog(): void {
    this.dialog.open(AppNotificationsComponent, {
      width: '800px',
      maxHeight: '600px',
    });
  }

  logout(): void {
    this.authService.logout();
  }
}

