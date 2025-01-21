import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';

import { ApiOrderService } from '../../services/order.service';

import { orderAllData } from '../../domain/orderAll.domain';
import { activeConductorData } from 'src/app/domain/activeConductor.domain';

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    TablerIconsModule,
    MatDialogModule,
    CommonModule,
    MatListModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './manual.component.html',
})
export class AppManualComponent implements OnInit {

  conductor: activeConductorData[] = [];
  conductorOptions: { value: string; viewValue: string; distance: string; }[] = [];
  selectedConductor: string | null = null;

  dataSource: activeConductorData[] = [];

  form: FormGroup;

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      conductor: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

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

  patchOrder(): { conductorAssignedId: string, totalDistance: number } | null {
    console.log('Form value:', this.form.value);
  
    const selectedConductor = this.form.value.conductor;
  
    if (!selectedConductor) {
      console.error('No conductor selected.');
      return null;
    }
  
    let { conductorId, totalDistance } = selectedConductor;
  
    console.log('Extracted conductorId:', conductorId);
    console.log('Extracted totalDistance:', totalDistance);
  
    const distanceMatch = totalDistance.match(/[\d.]+/);
    totalDistance = distanceMatch ? parseFloat(distanceMatch[0]) : NaN;
  
    if (!conductorId || isNaN(totalDistance)) {
      console.error('ConductorAssignedId or TotalDistance is missing or invalid');
      return null;
    }
  
    console.log('Patching order with:', { conductorAssignedId: conductorId, totalDistance });
  
    this.orderService.patchOrder(this.order.id, {
      conductorAssignedId: conductorId,
      totalDistance: totalDistance,
    }).subscribe(
      (data) => {
        console.log('Asignación exitosa:', data);
        this.snackBar.open('Se asignó el conductor exitosamente', 'Cerrar', { duration: 3000 });
        window.location.reload();
      },      (error) => {
        console.error('Error en la asignación:', error);
        if (error.error && error.error.errors) {
          console.error('Errores de validación:', error.error.errors);
          this.snackBar.open('Error de Validacion: ', error.error.error, {
            duration: 3000,
          });
        }
      }
    );
  
    return { conductorAssignedId: conductorId, totalDistance };
  }
  
}
