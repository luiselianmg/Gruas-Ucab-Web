import { Component, Inject, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { ApiOrderService } from '../../services/order.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { activeConductorData } from 'src/app/domain/activeConductor.domain';
import { orderAllData } from 'src/app/domain/orderAll.domain';

@Component({
  selector: 'app-automatic',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
  ],
  templateUrl: './automatic.component.html',
})
export class AppAutomaticComponent implements OnInit {
  conductor: activeConductorData[] = [];
  conductorOptions: { value: string; viewValue: string; distance: string; }[] = [];
  selectedConductor: string | null = null;
  closestConductorName: string | null = null;

  dataSource: activeConductorData[] = [];

  map!: google.maps.Map;
  distanciaTotal!: string;
  origin: string = '';
  destination: string = '';

  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
  };

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: orderAllData,
    private orderService: ApiOrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    console.log('Order data:', this.order);
    console.log('Order location:', this.order.location);

    this.loadConductors();

    if (!this.order.location) {
      console.error('Order location is not defined');
      return;
    }

    this.orderService.getConductorsActive().subscribe(async (data: activeConductorData[]) => {
      this.conductor = data;
      this.conductorOptions = await Promise.all(this.conductor.map(async (conductor) => {
        console.log('Conductor ID:', conductor.id);
        return {
          value: conductor.id as string,
          viewValue: conductor.name,
          distance: await this.calculateDistance(conductor.location, this.order.location),
        };
      }));
      await this.findClosestConductor();
    });
  }

  loadConductors(): void {
    this.orderService.getConductorsActive().subscribe(
      (conductores) => {
        this.dataSource = conductores;
        console.log('Conductores recibidos:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener conductores:', error);
      }
    );
  }

  async calculateDistance(conductorLocation: string, orderLocation: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const directionService = new google.maps.DirectionsService();
      const directionRender = new google.maps.DirectionsRenderer();

      directionRender.setMap(this.map);

      directionService.route({
        origin: conductorLocation,
        destination: orderLocation,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result && result.routes.length > 0 && result.routes[0].legs.length > 0 && result.routes[0].legs[0].distance) {
          resolve(result.routes[0].legs[0].distance.text);
        } else {
          console.error('Error al calcular la ruta:', status);
          resolve('Fuera de Rango');
        }
      });
    });
  }

  async findClosestConductor(): Promise<{ conductorId: string, totalDistance: string } | null> {
    if (!this.order.location) {
      console.error('Order location is not defined');
      return null;
    }

    const distances = await Promise.all(this.conductor.map(async (conductor) => {
      const distance = await this.calculateDistance(conductor.location, this.order.location);
      return { conductorId: conductor.id, totalDistance: distance, name: conductor.name };
    }));

    const validDistances = distances.filter(d => d.totalDistance !== 'Fuera de Rango');

    if (validDistances.length === 0) {
      console.error('No conductors found within range.');
      return null;
    }

    const closestConductor = validDistances.reduce((prev, curr) => {
      const prevDistance = parseFloat(prev.totalDistance.replace(/[^\d.]/g, ''));
      const currDistance = parseFloat(curr.totalDistance.replace(/[^\d.]/g, ''));
      return prevDistance < currDistance ? prev : curr;
    });

    this.closestConductorName = closestConductor.name;
    return closestConductor;
  }

  async patchOrder(): Promise<void> {
    const closestConductor = await this.findClosestConductor();

    if (!closestConductor) {
      console.error('No conductor found.');
      return;
    }

    const { conductorId, totalDistance } = closestConductor;

    console.log('Patching order with:', { conductorAssignedId: conductorId, totalDistance });

    this.orderService.patchOrder(this.order.id, {
      conductorAssignedId: conductorId,
      totalDistance: parseFloat(totalDistance.replace(/[^\d.]/g, '')),
    }).subscribe(
      (data) => {
        console.log('Asignación exitosa:', data);
        this.snackBar.open('Se asignó el conductor exitosamente', 'Cerrar', { duration: 3000 });
        window.location.reload();
      },
      (error) => {
        console.error('Error en la asignación:', error);
        if (error.error && error.error.errors) {
          console.error('Errores de validación:', error.error.errors);
          this.snackBar.open('Error de Validacion: ', error.error.error, {
            duration: 3000,
          });
        }
      }
    );
  }
}
