import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AngularFirestore } from '@angular/fire/compat/firestore'; 
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class AppCreateNotificationComponent implements OnInit {
  notification = {
    frequency: '',
    message: '',
    recipient: '',
    timestamp: new Date().toLocaleString(),
    type: '',
  };

  recipients: Recipient[] = [
    { value: 'intern', viewValue: 'Interno' },
    { value: 'extern', viewValue: 'Externo' },
    { value: 'all', viewValue: 'Todos' },
  ];

  type: NotificationType[] = [
    { value: 'recurrente', viewValue: 'Recurrente' },
    { value: 'extemporaneo', viewValue: 'Inmediato' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AppCreateNotificationComponent>,
    private firestore: AngularFirestore, 
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {}
  
  // TODO: No guarda la hora para crear la programada
  onSubmit(): void {
    
    this.firestore.collection('notification').add(this.notification)
    .then(() => {
      this.snackBar.open('Notificación enviada y guardada correctamente', 'Cerrar', {
        duration: 3000
      });
      this.dialogRef.close(this.notification);
      })
      .catch(error => {
        console.error('Error al guardar la notificación: ', error);
        this.snackBar.open('Hubo un error al enviar la notificación', 'Cerrar', {
          duration: 3000
        });
      });
  }

  onCancel() {
    console.log('Creación de notificación cancelada');
    this.dialogRef.close();
  }
}
