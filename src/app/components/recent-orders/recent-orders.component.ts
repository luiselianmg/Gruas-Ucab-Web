import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { ApiOrderService } from 'src/app/services/order.service';
import { orderData } from 'src/app/domain/order.domain';
import { conductorData } from 'src/app/domain/conductor.domain';

import { AppManualComponent } from '../manual/manual.component';
import { AppAutomaticComponent } from '../automatic/automatic.component';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './recent-orders.component.html',
})
export class AppRecentOrdersComponent {

  dataSource: orderData[] = [];
  conductors: { [key: string]: conductorData } = {}; 
  constructor(
    private dialog: MatDialog,
    private orderService: ApiOrderService
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit() {
  }

  private loadOrders() {
    this.orderService.getOrders().subscribe(
      (data: orderData[]) => {
        this.dataSource = data;

      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  // private loadConductors() {
  //   this.dataSource.forEach(order => {
  //     if (order.conductorAssignedId) {
  //       this.orderService.getConductor(order.conductorAssignedId).subscribe(
  //         (data: conductorData) => {
  //           this.conductors[order.conductorAssignedId.toString()] = data;
  //         },
  //         (error) => {
  //           console.error('Error al obtener el conductor:', error);
  //         }
  //       );
  //     }
  //   });
  // }

  openManualDialog(): void {
    this.dialog.open(AppManualComponent, {
      width: '600px',
      maxHeight: '500px',
    });
  }

  openAutomaticDialog(): void {
    this.dialog.open(AppAutomaticComponent, {
      width: '600px',
      maxHeight: '500px',
    });
  }

}
