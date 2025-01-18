import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { ApiOrderService } from 'src/app/services/order.service';
import { orderData } from 'src/app/domain/order.domain';
import { conductorData } from 'src/app/domain/conductor.domain';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './manual.component.html',
})
export class AppManualComponent implements OnInit {

  ordersSource: orderData[] = [];
  conductorsSource: conductorData[] = [];
  selectedConductorId: number | null = null;
  distances: { [key: number]: string } = {};

  constructor(private apiOrderService: ApiOrderService) { }

  ngOnInit(): void {
    this.apiOrderService.getOrders().subscribe(
      (data: orderData[]) => {
        this.ordersSource = data;
        this.loadConductors();
      },
      (error) => {
        console.error('Error al obtener las órdenes:', error);
      }
    );
  }

  private loadConductors() {
    this.apiOrderService.getConductors().subscribe(
      (data: conductorData[]) => {
        this.conductorsSource = data;
      },
      (error) => {
        console.error('Error al obtener los conductores:', error);
      }
    );
  }
  calculateDistance(conductorLocation: google.maps.LatLng, orderLocation: google.maps.LatLng): void {
    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [conductorLocation],
        destinations: [orderLocation],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response && response.rows[0].elements[0].status === 'OK') {
          const distance = response.rows[0].elements[0].distance?.text || '';
          console.log(`Distance from conductor to order: ${distance}`);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  }

  onAccept(): void {
    if (this.selectedConductorId === null) {
      console.error('No conductor selected.');
      return;
    }

    const totalDistance = parseFloat(this.distances[this.selectedConductorId] || '0');
    if (isNaN(totalDistance)) {
      console.error('Invalid distance value.');
      return;
    }

    // const orderId = this.ordersSource[0]?.id;
    // if (!orderId) {
    //   console.error('No order selected.');
    //   return;
    // }

    // this.apiOrderService
    //   .patchOrder(orderId, {
    //     conductorAssignedId: String(this.selectedConductorId),
    //     totalDistance,
    //   })
    //   .subscribe(
    //     (response) => {
    //       console.log('Order updated successfully:', response);
    //     },
    //     (error) => {
    //       console.error('Error updating order:', error);
    //     }
    //   );
  }

  onCancel(): void {
    this.selectedConductorId = null;
    console.log('Selection canceled.');
  }
}
