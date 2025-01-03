import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface contractData {
  id: number;
  imagePath: string;
  number: number;
  vehicle: string;
  policy: string;
  endDate: string;
  isActive: boolean;
}

interface Vehicle {
  value: string;
}

interface Policy {
  value: string;
}

const CONTRACT_DATA: contractData[] = [
  {
    id: 1,
    imagePath: 'assets/images/contract/image.png',
    number: 1,
    vehicle: 'Mercedes Amg GT 63s',
    policy: 'Oro',
    endDate: '2025-07-01',
    isActive: true,
  },
  {
    id: 2,
    imagePath: 'assets/images/contract/image.png',
    number: 2,
    vehicle: 'Ford F-150',
    policy: 'Bronce',
    endDate: '2021-07-01',
    isActive: false,
  },
  {
    id: 3,
    imagePath: 'assets/images/contract/image.png',
    number: 3,
    vehicle: 'Chevrolet Silverado',
    policy: 'Plata',
    endDate: '2025-07-01',
    isActive: true,
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
  templateUrl: './contract.component.html',
})
export class AppContractComponent {
  // Table
  displayedColumns1: string[] = ['imagePath', 'number', 'vehicle', 'policy' ,'endDate', 'isActive', 'budget'];
  dataSource1 = CONTRACT_DATA;
  // End Table

  // Select
  vehicle: Vehicle[] = [
    { value: 'Mercedes Amg GT 63s' },
    { value: 'Ford F-150' },
    { value: 'Chevrolet Silverado' },
  ];
  selectedVehicle = this.vehicle[0].value;  
  // End Select

  // Select
  policy: Policy[] = [
    { value: 'Oro' },
    { value: 'Plata' },
    { value: 'Bronce' },
  ];
  selectedPolicy = this.policy[0].value;  
  // End Select  

  craneStatus: string[] = ['Activa', 'Inactiva'];

}
