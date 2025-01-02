import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface userData {
  imagePath: string;
  name: string;
  phone: number;
  department: number;
}

interface Dept {
  value: number;
  viewValue: string;
}

const USER_DATA: userData[] = [
  { imagePath: 'assets/images/profile/user-1.jpg', name: 'Juan Perez', phone: 1234567890, department: 1},
  { imagePath: 'assets/images/profile/user-2.jpg', name: 'Maria Lopez', phone: 1234567890, department: 2},
  { imagePath: 'assets/images/profile/user-3.jpg', name: 'Pedro Ramirez', phone: 1234567890, department: 3},
  { imagePath: 'assets/images/profile/user-4.jpg', name: 'Javier Rodriguez', phone: 1234567890, department: 4},
];

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
export class AppUsersComponent {
    // Table
    displayedColumns1: string[] = ['class', 'name', 'phone', 'department', 'budget'];
    dataSource1 = USER_DATA;
    // End Table

    // Select
    dept: Dept[] = [
      {value: 1, viewValue: 'Administración'},
      {value: 2, viewValue: 'Ventas'},
      {value: 3, viewValue: 'Desarrollo'},
      {value: 4, viewValue: 'Recursos Humanos'}
    ];
    selectedDept = this.dept[0].value;
    // End Select
}
