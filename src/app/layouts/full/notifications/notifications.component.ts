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
    notifications = [
        {
          recipient: 'Conductor',
          message: 'Kindly check this latest update.',
          date: '15-Jan',
          type: 'Inmediato',
        },
    ];

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
            date: new Date().toLocaleDateString(),
            type: result.type,
          });
          console.log('Nueva notificación creada:', result);
        } else {
          console.log('Creación de notificación cancelada');
        }
      });
    }
}