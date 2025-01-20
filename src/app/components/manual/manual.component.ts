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
import { MatSelectionListChange } from '@angular/material/list';

import { GoogleMapsModule } from '@angular/google-maps';

import { ApiOrderService } from '../../services/order.service';

import { orderAllData } from '../../domain/orderAll.domain';
import { conductorData } from 'src/app/domain/conductor.domain';

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

  conductor: conductorData[] = [];
  conductorOptions: { value: string; viewValue: string; distance: string; }[] = [];
  selectedConductor: string | null = null;

  form: FormGroup;

  map!: google.maps.Map;
  distanciaTotal!: string;
  origin: string = '';
  destination: string = '';

  // Google maps general configuration
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: 10.4806, lng: -66.9036 },
    zoom: 12,
  };
  //

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: orderAllData,
    private orderService: ApiOrderService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      conductorId: [null, Validators.required],
      distanciaTotal: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    console.log('Order data:', this.order);
    console.log('Order location:', this.order.location);

    if (!this.order.location) {
      console.error('Order location is not defined');
      return;
    }

    this.orderService.getConductors().subscribe(async (data: conductorData[]) => {
      this.conductor = data;
      this.conductorOptions = await Promise.all(this.conductor.map(async (conductor) => ({
        value: conductor.conductorId as string,
        viewValue: conductor.name,
        distance: await this.calculateDistance(conductor.location, this.order.location)
      })));
    });
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

  onConductorSelection(event: MatSelectionListChange) {
    const selectedConductor = event.options[0].value;
    this.form.patchValue({
      conductorId: selectedConductor.value,
      distanciaTotal: selectedConductor.distance
    });
  }

  patchOrder(): { conductorId: string, totalDistance: number } | null {
    const conductorId: string = this.form.value.conductorId;
    console.log('Selected conductorId:', conductorId);

    const selectedConductor = this.conductorOptions.find((conductor) => conductor.value === conductorId);
    if (!selectedConductor) {
      console.error('Conductor no encontrado');
      this.snackBar.open('Conductor no encontrado. Por favor, revise la información e intente nuevamente.', 'Cerrar', {
        duration: 3000
      });
      return null;
    }

    const totalDistance: number = parseFloat(selectedConductor.distance || '0');
    console.log('Calculated totalDistance:', totalDistance); // Debugging line

    if (!conductorId || isNaN(totalDistance)) {
      console.error('Datos inválidos:', { conductorId, totalDistance });
      this.snackBar.open('Datos inválidos. Por favor, revise la información e intente nuevamente.', 'Cerrar', {
        duration: 3000
      });
      return null;
    }
    console.error('Datos válidos:', { conductorId, totalDistance });

    this.orderService.patchOrder(this.order.id,
      {
        conductorAssignedId: conductorId,
        totalDistance: totalDistance
      }).subscribe(
        (data) => {
          console.log('Asignación exitosa:', data);
          this.snackBar.open('Se asignó el conductor exitosamente', 'Cerrar', {
            duration: 3000
          });
        },
        (error) => {
          console.error('Error en la asignación:', error);
          this.snackBar.open('Error en la asignación. Por favor, intente nuevamente.', 'Cerrar', {
            duration: 3000
          });
        }
      );

    return { conductorId, totalDistance };
  }

}
