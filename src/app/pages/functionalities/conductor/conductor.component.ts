import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { HasRoleDirective } from '../../../directives/has-role.directive';

import { conductorData } from 'src/app/domain/conductor.domain';
import { userData } from 'src/app/domain/user.domain';
import { allCraneData } from 'src/app/domain/craneAll.domain';

import { ApiOrderService } from 'src/app/services/order.service';
import { ApiProviderService } from 'src/app/services/provider.service';
import { ApiCraneService } from 'src/app/services/crane.service';
import { AuthService } from 'src/app/services/auth.service';
import { craneData } from 'src/app/domain/crane.domain';

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
    ReactiveFormsModule,
    HasRoleDirective
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
  ];
  // TODO: Filtrado para que la grua que segun el proveedor que se seleccione solo salgan las gruas asociadas a ese proveedor
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

  crane: allCraneData[] = [];
  craneOptions: { value: string; viewValue: string; plate:string }[] = [];
  selectedCrane: string | null = null;

  userId = this.apiAuthProvider.getUserId();

  constructor(
    private apiOrderService: ApiOrderService,
    private apiProviderService: ApiProviderService,
    private apiAuthProvider: AuthService,
    private apiCraneService: ApiCraneService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      providerId: ['', Validators.required],
      conductorId: ['', Validators.required],
      dni: ['', Validators.required],
      name: ['', Validators.required],
      location: ['10.482110,-66.862813'],
      image: ['/assets/images/conductor.png'],
      craneId: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    const userId = this.apiAuthProvider.getUserId();

    if (userId) {
      if (this.apiAuthProvider.isAdmin()) {
        this.loadCraneAdmin();
        this.loadConductorAdmin();
      } else {
        this.loadCrane(userId);
        this.loadConductor(userId);
      }
      this.loadProvider();
      this.loadUsuario();
    } else {
      console.error('Error al obtener el id del Proveedor');
    }
  }

  loadConductor(userId: string): void {
    this.apiOrderService.getConductorByProvider(userId).subscribe((data: conductorData[]) => {
      this.conductor = data;
      console.log('Conductores de Proveedor:', this.conductor);
    },
      (error) => {
        console.error('Error al obtener los conductores:', error);
      });
  }

  loadConductorAdmin(): void {
    this.apiOrderService.getConductors().subscribe((data) => {
        this.conductor = data;
        console.log('Conductores de administrador:', this.conductor);
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

  loadCrane(userId: string): void {
    this.apiCraneService.getCraneByProvider(userId).subscribe((data: craneData[]) => {
      this.crane = data;
      this.craneOptions = this.crane.map((crane) => ({
        value: crane.id as string,
        viewValue: crane.brand,
        plate: crane.plate,
      }));
      console.log('Gruas de Proveedor:', this.crane);
    },
    (error) => {
      console.error('Error al obtener las gruas de proveedor:', error);
    }
    );
  }

  loadCraneAdmin(): void {
    this.apiCraneService.getCranes().subscribe((data) => {
      this.crane = data;
      this.craneOptions = this.crane.map((crane) => ({
        value: crane.id as string,
        viewValue: crane.brand,
        plate: crane.plate,
      }));
    });
  }

  createConductor() {
    console.log('Id del usuario:', this.apiAuthProvider.getUserId());
    const newConductor: conductorAux = {
      providerId: this.form.value.providerId || this.apiAuthProvider.getUserId(),
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
        this.snackBar.open('Conductor Creado con Exito', 'Cerrar', {
          duration: 3000
        });
        window.location.reload();
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
