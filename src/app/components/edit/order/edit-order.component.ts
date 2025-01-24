import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { orderAllData } from 'src/app/domain/orderAll.domain';

import { ApiOrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit-order',
  standalone: true,
  templateUrl: './edit-order.component.html',
  imports: [
    MaterialModule,
    MatDialogModule,
    CommonModule
  ]
})
export class AppEditOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<AppEditOrderComponent>,
    private dialog: MatDialog,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private orderService: ApiOrderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onCancelOrder(data: orderAllData): void {
    this.orderService.cancelOrder(data.id).subscribe((success) => {
      if (success) {
        this.snackBar.open('Se cancelo la orden exitosamente', 'Cerrar', {
          duration: 50000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error al cancelar la orden', 'Cerrar', {
          duration: 50000
        });
      }
    },
      (error) => {
        console.error('Error al cancelar la orden: ', error);
        this.snackBar.open('Error al cancelar la orden', 'Cerrar', {
          duration: 50000
        });
      }
    );
  }

  onProcessOrder(data: orderAllData): void {
    this.orderService.processOrder(data.id).subscribe((success) => {
      if (success) {
        this.snackBar.open('La orden esta en proceso', 'Cerrar', {
          duration: 50000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error al colocar la orden en proceso', 'Cerrar', {
          duration: 50000
        });
      }
    },
      (error) => {
        console.error('Error al colocar la orden en proceso: ', error);
        this.snackBar.open('Error al colocar la orden en proceso', 'Cerrar', {
          duration: 50000
        });
      }
    );
  }

  onFinalizeOrder(data: orderAllData): void {
    this.orderService.finalizeOrder(data.id).subscribe((success) => {
      if (success) {
        this.snackBar.open('La orden se finalizo correctamente', 'Cerrar', {
          duration: 50000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error al finalizar la orden', 'Cerrar', {
          duration: 50000
        });
      }
    },
      (error) => {
        console.error('Error al finalizar la orden: ', error);
        this.snackBar.open('Error al finalizar la orden', 'Cerrar', {
          duration: 50000
        });
      }
    );
  }

  onPayOrder(data: orderAllData): void {
    this.orderService.payOrder(data.id).subscribe((success) => {
      if (success) {
        this.snackBar.open('La orden se marco como pagada', 'Cerrar', {
          duration: 50000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error marcar la orden como pagada', 'Cerrar', {
          duration: 50000
        });
      }
    },
      (error) => {
        console.error('Error marcar la orden como pagada: ', error);
        this.snackBar.open('Error marcar la orden como pagada', 'Cerrar', {
          duration: 50000
        });
      }
    );
  }
}
