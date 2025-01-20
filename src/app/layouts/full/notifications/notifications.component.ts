import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AppCreateNotificationComponent } from 'src/app/components/notifications/notifications.component';

import { notificationData } from '../../../domain/notifications';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
export class AppNotificationsComponent implements OnInit {

  notifications: notificationData[] = [];

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.firestore.collection<notificationData>('notification').valueChanges().subscribe(data => {
      this.notifications = data;
    });
  }

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
