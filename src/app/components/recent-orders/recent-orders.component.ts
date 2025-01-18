import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { orderAllData } from '../../domain/orderAll.domain';
import { conductorData } from '../../domain/conductor.domain';

import { ApiOrderService } from '../../services/order.service';

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

  dataSource: orderAllData[] = [];
  currentPage: number = 0;
  pageSize: number = 4;
  
  conductors: { [key: string]: conductorData } = {}; 

  constructor(
    private dialog: MatDialog,
    private orderService: ApiOrderService
  ) { }

  ngOnInit() {
    this.loadOrders();
    this.loadConductors();
  }

  ngAfterViewInit() {
  }

  private loadOrders() {
    this.orderService.getOrdersAllData().subscribe(
      (data: orderAllData[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  private loadConductors() {
    this.dataSource.forEach(order => {
      if (order.conductorAssignedId) {
        this.orderService.getConductor(order.conductorAssignedId).subscribe(
          (data: conductorData) => {
            this.conductors[order.conductorAssignedId.toString()] = data;
          },
          (error) => {
            console.error('Error al obtener el conductor:', error);
          }
        );
      }
    });
  }

  get paginatedOrders() {
    const startIndex = this.currentPage * this.pageSize;
    return this.dataSource.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.dataSource.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

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
