import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, 
    CommonModule, 
    NgScrollbarModule, 
    TablerIconsModule, 
    MaterialModule, 
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './notifications.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppCreateNotificationComponent {
  notification = {
    sender: '',
    tag: '',
    message: '',
  };

  tags = ['Personal', 'Work', 'Urgent'];

  constructor(public dialogRef: MatDialogRef<AppCreateNotificationComponent>) {}

  onSubmit() {
    console.log('Notificación creada:', this.notification);
    // Cierra el componente y devuelve los datos de la notificación
    this.dialogRef.close(this.notification);
  }

  onCancel() {
    console.log('Creación de notificación cancelada');
    // Cierra el componente sin devolver datos
    this.dialogRef.close();
  }
}
