import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { ApiUserService } from 'src/app/services/user.service';
import { userData } from '../../../domain/user.domain';

import { ApiDepartmentService } from 'src/app/services/departament.service';
import { departmentData } from '../../../domain/department.domain';

interface Dept {
  value: number;
  viewValue: string;
}

interface Role {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-users',
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
  templateUrl: './users.component.html',
})
export class AppUsersComponent implements OnInit {
  
  // Imagenes
  imagePaths: string[] = [
    'assets/images/profile/user-1.jpg',
    'assets/images/profile/user-2.jpg',
    'assets/images/profile/user-3.jpg',
    'assets/images/profile/user-4.jpg'
  ];
  // End Imagenes

  // Table
  displayedColumns: string[] = ['name', 'phone', 'department', 'role', 'isActive', 'budget'];
  dataSource: userData[] = [];
  // End Table

  constructor(private apiUserService: ApiUserService) {}
    // Select
    dept: Dept[] = [
      {value: 1, viewValue: 'Administración'},
      {value: 2, viewValue: 'Ventas'},
      {value: 3, viewValue: 'Desarrollo'},
      {value: 4, viewValue: 'Recursos Humanos'}
    ];
    selectedDept = this.dept[1].value;
    // End Select

    // Select
    role: Role[] = [
      {value: 1, viewValue: 'Administrador'},
      {value: 2, viewValue: 'Operador de Cabina'},
      {value: 3, viewValue: 'Conductor'},
    ];
    selectedRole = this.role[0].value;
    // End Select

  ngOnInit(): void {
    this.apiUserService.getUser().subscribe(
      (data: userData[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }

  getImagePath(index: number): string {
    return this.imagePaths[index % this.imagePaths.length];
  }

  craneStatus: string[] = ['Activo', 'Inactivo'];
}
