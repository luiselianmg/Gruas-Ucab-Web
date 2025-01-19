import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { craneData } from 'src/app/domain/crane.domain';

import { ApiCraneService } from 'src/app/services/crane.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    ReactiveFormsModule
  ],
  templateUrl: './crane.component.html',
})
export class AppCraneComponent implements OnInit{
  // Table
  displayedColumns: string[] = ['brand', 'model', 'plate' ,'year', 'type', 'budget'];
  dataSource: craneData[] = [];

  // Select
  type: Type[] = [
    { value: 'light', viewValue: 'Ligera' },
    { value: 'medium', viewValue: 'Media' },
    { value: 'heavy', viewValue: 'Pesada' },
  ];
  selectedType = this.type[0].value;  

  form: FormGroup;

  constructor
  (
    private ApiCraneService: ApiCraneService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      providerId: ['04eab328-a4bf-42ad-94f6-1a1cbc3bd07c'],
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
    this.loadCrane();
  }

  loadCrane(): void {
    this.ApiCraneService.getCranes().subscribe(
      (data: craneData[]) => {
        this.dataSource = data;
        console.log('Gruas:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener las gruas:', error);
      }
    );
  }

  createCrane(): void {
    const newCrane: craneData = {
      providerId: this.form.value.providerId,
      brand: this.form.value.brand,
      model: this.form.value.model,
      plate: this.form.value.plate,
      type: this.form.value.type,
      year: this.form.value.year,
    }

    this.ApiCraneService.createCrane(newCrane).subscribe(
      (data: craneData) => {
        console.log('Grua creada:', data);
        this.snackBar.open('Se creo la grua exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.loadCrane();
      },
      (error) => {
        console.error('Error al crear la grua:', error);
      }
    );
  }

  getImagePath(type: string): string {
    switch (type) {
      case 'light':
        return 'assets/images/light.png';
      case 'medium':
        return 'assets/images/medium.png';
      case 'heavy':
        return 'assets/images/heavy.png';
      default:
        return 'assets/images/default.png';
    }
  }

}
