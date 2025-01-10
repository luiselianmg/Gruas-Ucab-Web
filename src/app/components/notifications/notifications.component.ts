import { Component, ViewEncapsulation } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';


interface Recipient {
  value: string;
  viewValue: string;
}

interface NotificationType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule
  ],
  templateUrl: './notifications.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppCreateNotificationComponent {
  notification = {
    recipient: '',
    message: '',
    type: '',
    frequency: '',
    scheduledDate: null,
  };

  recipients: Recipient[] = [
    { value: 'provider', viewValue: 'Proveedor' },
    { value: 'conductor', viewValue: 'Conductor' },
    { value: 'operator', viewValue: 'Operador de Cabina' },
    { value: 'all', viewValue: 'Todos' },
  ];

  types: NotificationType[] = [
    { value: 'inmediato', viewValue: 'Inmediato' },
    { value: 'recurrente', viewValue: 'Recurrente' },
    { value: 'programado', viewValue: 'Programado' },
  ];

  constructor(public dialogRef: MatDialogRef<AppCreateNotificationComponent>) {}

  onSubmit() {
    console.log('Notificación creada:', this.notification);
    this.dialogRef.close(this.notification);
  }

  onCancel() {
    console.log('Creación de notificación cancelada');
    this.dialogRef.close();
  }
}