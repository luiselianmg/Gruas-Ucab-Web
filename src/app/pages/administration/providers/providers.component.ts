import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface providerData {
  imagePath: string;
  name: string;
  rif: number;
  isActive: boolean;
}

interface isActive {
  value: boolean;
  viewValue: string;
}

const PROVIDER_DATA: providerData[] = [
  { imagePath: 'assets/images/profile/user-1.jpg', name: 'Juan Perez', rif: 1234567890, isActive: true},
  { imagePath: 'assets/images/profile/user-2.jpg', name: 'Maria Lopez', rif: 1234567890, isActive: false},
  { imagePath: 'assets/images/profile/user-3.jpg', name: 'Pedro Ramirez', rif: 1234567890, isActive: false},
  { imagePath: 'assets/images/profile/user-4.jpg', name: 'Javier Rodriguez', rif: 1234567890, isActive: true},
];

@Component({
  selector: 'app-roles',
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
  templateUrl: './providers.component.html',
})
export class AppProvidersComponent {
    // Table
    displayedColumns1: string[] = ['class', 'name', 'phone', 'department', 'budget'];
    dataSource1 = PROVIDER_DATA;
    // End Table
    providerStatus: string[] = ['Activo', 'Inactivo'];

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
    
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log('Archivo seleccionado:', file);    
      }
    }
    
}
