import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HasRoleDirective } from '../../../directives/has-role.directive';

import { craneData } from 'src/app/domain/crane.domain';
import { userData } from 'src/app/domain/user.domain';

import { ApiCraneService } from 'src/app/services/crane.service';
import { ApiProviderService } from 'src/app/services/provider.service';
import { AuthService } from 'src/app/services/auth.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crane',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule, 
    HasRoleDirective
  ],
  templateUrl: './crane.component.html',
})
export class AppCraneComponent implements OnInit{
  // Table
  displayedColumns: string[] = ['imagePath', 'brand', 'model', 'plate' ,'year', 'type'];
  dataSource: craneData[] = [];

  // Select
  type: Type[] = [
    { value: 'light', viewValue: 'Ligera' },
    { value: 'medium', viewValue: 'Media' },
    { value: 'heavy', viewValue: 'Pesada' },
  ];
  selectedType = this.type[0].value;  

  form: FormGroup;

  provider: userData[] = [];
  providerOptions: { value: string; viewValue: string }[] = [];
  selectedProvider: string | null = null;

  userId = this.apiAuthProvider.getUserId();

  constructor
  (
    private ApiCraneService: ApiCraneService,
    private apiProviderService: ApiProviderService,
    private apiAuthProvider: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      providerId: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      plate: ['', Validators.required],
      type: this.selectedType,
      year: ['', Validators.required],
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
    }else{
      this.loadCrane(userId);
    }
    this.loadProvider();
  } else {
    console.error('Error al obtener el id del Proveedor');
  }
}

  loadCrane(userId: string): void {
    this.ApiCraneService.getCraneByProvider(userId).subscribe((data: craneData[]) => {
      this.dataSource = data;
      console.log('Gruas de Proveedor:', this.dataSource);
    },
    (error) => {
      console.error('Error al obtener las gruas de proveedor:', error);
    }
    );
  }

  loadCraneAdmin(): void {
    this.ApiCraneService.getCranes().subscribe((data) => {
        this.dataSource = data;
        console.log('Gruas de Administrador:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener las gruas:', error);
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

  createCrane(): void {
    console.log('From', this.form.value);
    const newCrane: craneData = {
      providerId: this.form.value.providerId || this.apiAuthProvider.getUserId(),
      brand: this.form.value.brand,
      model: this.form.value.model,
      plate: this.form.value.plate,
      type: this.form.value.type,
      year: this.form.value.year,
    }

    this.ApiCraneService.createCrane(newCrane).subscribe(
      (data: craneData) => {
        this.dataSource.push(data);
        console.log('Grua creada:', data);
        this.snackBar.open('Se creo la grua exitosamente', 'Cerrar', {
          duration: 3000
        });
        window.location.reload();
      },
      (error) => {
        console.error('Error al crear la grua:', error);
        this.snackBar.open('Error al crear la grua', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  getImagePath(type: string): string {
    switch (type) {
      case 'light':
        return '/assets/images/crane/ligera.png';
      case 'medium':
        return '/assets/images/crane/mediana.png';
      default:
        return '/assets/images/crane/pesada.png';
    }
  }

}
