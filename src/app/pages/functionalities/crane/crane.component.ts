import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface craneData {
  id: number;
  imagePath: string;
  brand: string;
  model: string;
  plate: string;
  year: number;
  type: string;
  isActive: boolean;
}

interface Type {
  value: string;
}

const CRANE_DATA: craneData[] = [
  {
    id: 1,
    imagePath: 'assets/images/crane/ligera.png',
    brand: 'Mercedes Benz',
    model: 'PK33002-EH',
    year: 2018,
    type: 'Ligera',
    isActive: true,
    plate: '1234-ABC',
  },
  {
    id: 2,
    imagePath: 'assets/images/crane/pesada.png',
    brand: 'Liebherr',
    model: 'LTM 11200-9.1',
    year: 2008,
    type: 'Pesada',
    isActive: false,
    plate: '5678-DEF',
  },
  {
    id: 3,
    imagePath: 'assets/images/crane/mediana.png',
    brand: 'Terex',
    model: 'RT 100US',
    year: 2015,
    type: 'Mediana',
    isActive: false,
    plate: '9012-GHI',
  },
  {
    id: 4,
    imagePath: 'assets/images/crane/ligera.png',
    brand: 'Liebherr',
    model: 'LTM 1090-4.2',
    year: 2019,
    type: 'Ligera',
    isActive: true,
    plate: '3456-JKL',
  },
  {
    id: 5,
    imagePath: 'assets/images/crane/mediana.png',
    brand: 'Terex',
    model: 'RT 780',
    year: 2020,
    type: 'Mediana',
    isActive: true,
    plate: '7890-MNO',
  },
  {
    id: 6,
    imagePath: 'assets/images/crane/mediana.png',
    brand: 'Terex',
    model: 'RT 780',
    year: 2020,
    type: 'Mediana',
    isActive: false,
    plate: '1234-PQR',
  },
  {
    id: 7,
    imagePath: 'assets/images/crane/ligera.png',
    brand: 'Liebherr',
    model: 'LTM 1090-4.2',
    year: 2019,
    type: 'Ligera',
    isActive: true,
    plate: '5678-STU',
  },
  {
    id: 8,
    imagePath: 'assets/images/crane/mediana.png',
    brand: 'Terex',
    model: 'RT 780',
    year: 2020,
    type: 'Mediana',
    isActive: false,
    plate: '9012-VWX',
  },
];

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
  ],
  templateUrl: './crane.component.html',
})
export class AppCraneComponent {
  // Table
  displayedColumns1: string[] = ['imagePath', 'brand', 'model', 'plate' ,'year', 'type', 'isActive', 'budget'];
  dataSource1 = CRANE_DATA;
  // End Table

  // Select
  type: Type[] = [
    { value: 'Ligera' },
    { value: 'Mediana' },
    { value: 'Pesada' },
  ];
  selectedType = this.type[0].value;  
  // End Select

  craneStatus: string[] = ['Activa', 'Inactiva'];

}
