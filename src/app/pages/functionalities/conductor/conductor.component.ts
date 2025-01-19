import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { conductorData } from 'src/app/domain/conductor.domain';

import { ApiOrderService } from 'src/app/services/order.service';

interface  conductorAux {
  providerId: string;
  conductorId: string;
  dni: number;
  name: string;
  location: string;
  image: string;
  craneId: string;
}

@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './conductor.component.html',
})
export class AppConductorComponent implements OnInit {
  displayedColumns: string[] = [
    'image',
    'dni',
    'name',
    'assignedCrane',
    'isActive',
    'actions',
  ];
  dataSource: conductorData[] = [];

  form: FormGroup;

  // TODO: Falta agregar los Dropdowns de gruas y conductores, falta pasar el providerId por parametro

  constructor(
    private apiOrderService: ApiOrderService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      providerId: ['04eab328-a4bf-42ad-94f6-1a1cbc3bd07c'],
      conductorId: ['8a74790c-bab2-4557-9207-61cad2280d69'],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      location: ['39.7128,-71.0060'],
      image: ['../../../../assets/images/conductor.png'],
      craneId: ['2889e97d-c16e-4fac-9046-1401163508e1'],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadConductor();
  }

  loadConductor(): void {
    this.apiOrderService.getConductors().subscribe(
      (data: conductorData[]) => {
        this.dataSource = data;
        console.log('Conductores:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener los conductores:', error);
      }
    );
  }

  createConductor() {
    const newConductor: conductorAux = {
      providerId: this.form.value.providerId,
      conductorId: this.form.value.conductorId,
      dni: this.form.value.dni,
      name: this.form.value.name,
      location: this.form.value.location,
      image: this.form.value.image,
      craneId: this.form.value.craneId,
    }

    this.apiOrderService.createConductor(newConductor).subscribe(
      (data: conductorAux) => {
        console.log('Conductor creado:', data);
        this.loadConductor();
      },
      (error) => {
        console.error('Error al crear el conductor:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.form.patchValue({ image: file });
      console.log('File selected:', file);
    }
  }
}