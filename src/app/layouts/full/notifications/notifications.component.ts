import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppCreateNotificationComponent } from 'src/app/components/notifications/notifications.component';

import { notificationData } from '../../../domain/notifications';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, 
    CommonModule, 
    NgScrollbarModule, 
    TablerIconsModule, 
    MaterialModule, 
    MatDialogModule,
  ],
  templateUrl: './notifications.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppNotificationsComponent {
    
    notifications: notificationData[] = [];

    constructor(private dialog: MatDialog) {}

    openCreateNotification(): void {
      const dialogRef = this.dialog.open(AppCreateNotificationComponent, {
        width: '600px',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.notifications.push({
            recipient: result.recipient,
            message: result.message,
            timestamp: new Date().toLocaleString(),
            type: result.type,
          });
          console.log('Nueva notificación creada:', result);
        } else {
          console.log('Creación de notificación cancelada');
        }
      });
    }
}