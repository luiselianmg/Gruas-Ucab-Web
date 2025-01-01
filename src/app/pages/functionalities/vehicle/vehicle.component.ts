import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface vehiclesData {
  id: number;
  imagePath: string;
  brand: string;
  model: string;
  year: number;
  type: string;
}

interface Type {
  value: string;
}

const VEHICLE_DATA: vehiclesData[] = [
  {
    id: 1,
    imagePath: 'assets/images/vehicles/ligero.jpeg',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2018,
    type: 'Ligero',
  },
  {
    id: 2,
    imagePath: 'assets/images/vehicles/pesado.jpeg',
    brand: 'Nissan',
    model: 'Sentra',
    year: 2008,
    type: 'Pesado',
  },
  {
    id: 3,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Ford',
    model: 'F-150',
    year: 2015,
    type: 'Mediano',
  },
  {
    id: 4,
    imagePath: 'assets/images/vehicles/ligero.jpeg',
    brand: 'Chevrolet',
    model: 'Aveo',
    year: 2019,
    type: 'Ligero',
  },
  {
    id: 5,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Ford',
    model: 'F-250',
    year: 2020,
    type: 'Mediano',
  },
  {
    id: 6,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2024,
    type: 'Mediano',
  },
  {
    id: 7,
    imagePath: 'assets/images/vehicles/ligero.jpeg',
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2017,
    type: 'Ligero',
  },
  {
    id: 8,
    imagePath: 'assets/images/vehicles/pesado.jpeg',
    brand: 'Chevrolet',
    model: 'Spark',
    year: 2012,
    type: 'Pesado',
  },
];

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle.component.html',
})
export class AppVehicleComponent {
  // Table
  displayedColumns1: string[] = ['class', 'brand', 'model', 'year', 'type'];
  dataSource1 = VEHICLE_DATA;
  // End Table

  // Select
  type: Type[] = [
    { value: 'Ligero' },
    { value: 'Mediano' },
    { value: 'Pesado' },
  ];
  selectedType = this.type[0].value;
  // End Select

}
