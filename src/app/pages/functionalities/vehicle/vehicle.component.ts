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
  plate: string;
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
    plate: 'ABC-123',
  },
  {
    id: 2,
    imagePath: 'assets/images/vehicles/pesado.jpeg',
    brand: 'Nissan',
    model: 'Sentra',
    year: 2008,
    type: 'Pesado',
    plate: 'DEF-456',
  },
  {
    id: 3,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Ford',
    model: 'F-150',
    year: 2015,
    type: 'Mediano',
    plate: 'GHI-789',
  },
  {
    id: 4,
    imagePath: 'assets/images/vehicles/ligero.jpeg',
    brand: 'Chevrolet',
    model: 'Aveo',
    year: 2019,
    type: 'Ligero',
    plate: 'JKL-101',
  },
  {
    id: 5,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Ford',
    model: 'F-250',
    year: 2020,
    type: 'Mediano',
    plate: 'MNO-112',
  },
  {
    id: 6,
    imagePath: 'assets/images/vehicles/medio.jpeg',
    brand: 'Toyota',
    model: 'Hilux',
    year: 2024,
    type: 'Mediano',
    plate: 'PQR-113',
  },
  {
    id: 7,
    imagePath: 'assets/images/vehicles/ligero.jpeg',
    brand: 'Nissan',
    model: 'X-Trail',
    year: 2017,
    type: 'Ligero',
    plate: 'STU-114',
  },
  {
    id: 8,
    imagePath: 'assets/images/vehicles/pesado.jpeg',
    brand: 'Chevrolet',
    model: 'Spark',
    year: 2012,
    type: 'Pesado',
    plate: 'VWX-115',
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
  displayedColumns1: string[] = ['class', 'brand', 'model', 'plate', 'year', 'type', 'budget'];
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
