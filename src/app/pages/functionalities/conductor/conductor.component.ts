import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { conductorData } from 'src/app/domain/conductor.domain';
import { userData } from 'src/app/domain/user.domain';

import { ApiOrderService } from 'src/app/services/order.service';
import { ApiProviderService } from 'src/app/services/provider.service';

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

  form: FormGroup;

  conductor: conductorData[] = [];
  conductorOptions: { value: string; viewValue: string }[] = [];
  selectedOperator: string | null = null;

  provider: userData[] = [];
  providerOptions: { value: string; viewValue: string }[] = [];
  selectedProvider: string | null = null;

  user: userData[] = [];
  userOptions: { value: string; viewValue: string }[] = [];
  selectedUser: string | null = null;

  // TODO: Falta agregar los Dropdowns de gruas y conductores, falta pasar el providerId por parametro

  constructor(
    private apiOrderService: ApiOrderService,
    private apiProviderService: ApiProviderService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      // TODO: Agregar aqui una validacion que diga que si el usuario tiene rol de admin extraiga del formulario, sino el id del provider va a ser el id del usuario 
      providerId: ['', Validators.required],
      conductorId: ['', Validators.required],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      // TODO: Esta location viene del backend
      location: ['39.7128,-71.0060'],
      image: ['../../../../assets/images/conductor.png'],
      // TODO: Falta el dropdown de las gruas
      craneId: ['2889e97d-c16e-4fac-9046-1401163508e1'],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadConductor();
    this.loadProvider();
    this.loadUsuario();
  }

  loadConductor(): void {
    this.apiOrderService.getConductors().subscribe(
      (data: conductorData[]) => {
        this.conductor = data;
        console.log('Conductores:', this.conductor);
      },
      (error) => {
        console.error('Error al obtener los conductores:', error);
      }
    );
  }
  
  loadProvider(): void {
    this.apiProviderService.getUser().subscribe((users) => {
      this.provider = users.filter(user => user.role === 'provider');
      this.providerOptions = this.provider.map((user) => ({
        value: user.id as string,
        viewValue: user.name,
      }));
    });
  }

  // Este usuario es el conductor
  loadUsuario(): void {
    this.apiProviderService.getUser().subscribe((users) => {
      this.user = users.filter(user => user.role === 'conductor');
      this.userOptions = this.user.map((user) => ({
        value: user.id as string,
        viewValue: user.name,
      }));
    });
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
        this.snackBar.open('Conductor Creado con Exito', 'Cerrar', {
          duration: 3000
        });
      },
      (error) => {
        console.error('Error al crear el conductor:', error);
        this.snackBar.open('Error al crear el conductor', 'Cerrar', {
          duration: 3000
        });
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