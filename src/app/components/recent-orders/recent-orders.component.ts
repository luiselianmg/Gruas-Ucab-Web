import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { AppExtraCostComponent } from '../extra-cost/extra-cost.component';

import { orderAllData } from '../../domain/orderAll.domain';
import { conductorData } from '../../domain/conductor.domain';

import { ApiOrderService } from '../../services/order.service';

import { AppManualComponent } from '../manual/manual.component';
import { AppAutomaticComponent } from '../automatic/automatic.component';

// TODO: Editar Estado de las Ordenes

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
  selectedStatus: string = '';
  orderStatuses: string[] = ["por asignar", "por aceptar", "aceptado", "localizado", "en proceso", "finalizado", "pagado", "cancelado"];

  conductors: { [key: string]: conductorData } = {};

  constructor(
    private dialog: MatDialog,
    private orderService: ApiOrderService
  ) { }

  ngOnInit() {
    this.loadConductors();
    this.loadOrders();
  }

  ngAfterViewInit() {
  }

  private loadOrders() {
    this.orderService.getOrdersAllData().subscribe(
      (data: orderAllData[]) => {
        const statusOrder = ["por asignar", "por aceptar", "aceptado", "localizado", "en proceso", "finalizado", "pagado", "cancelado"];
        this.dataSource = data.sort((a, b) => statusOrder.indexOf(a.orderStatus) - statusOrder.indexOf(b.orderStatus));
        this.loadConductors();
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
    const filteredOrders = this.selectedStatus ? this.dataSource.filter(order => order.orderStatus === this.selectedStatus) : this.dataSource;
    return filteredOrders.slice(startIndex, startIndex + this.pageSize);
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

  filterOrders(status: string) {
    this.selectedStatus = status;
    this.currentPage = 0;
  }

  openManualDialog(order: orderAllData): void {
    this.dialog.open(AppManualComponent, {
      width: '600px',
      maxHeight: '500px',
      data: order,
    });
  }

  openAutomaticDialog(order: orderAllData): void {
    this.dialog.open(AppAutomaticComponent, {
      width: '600px',
      maxHeight: '500px',
      data: order,
    });
  }

  openExtraCostDialog(order: orderAllData): void {
    this.dialog.open(AppExtraCostComponent, {
      width: '600px',
      maxHeight: '500px',
      data: order,
    });
  }
}
