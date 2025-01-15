import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiUserService } from 'src/app/services/user.service';
import { userData } from '../../../domain/user.domain';

import { ApiDepartmentService } from 'src/app/services/departament.service';
import { departmentData } from '../../../domain/department.domain';

interface Dept {
  value: string;
  viewValue: string;
}

interface Role {
  value: string;
  viewValue: string;
}

interface Status {
  value: boolean;
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
    ReactiveFormsModule,
    FormsModule
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

  getImagePath(index: number): string {
    return this.imagePaths[index % this.imagePaths.length];
  }

  // Table
  displayedColumns: string[] = ['name', 'phone', 'department', 'role', 'isActive', 'budget'];
  dataSource: userData[] = [];
  // End Table

  // Formulario de creación de usuario
  users: userData[] = [];

  // Select
  dept: Dept[] = [
    {value: 'ff212f2d-66ff-4162-b353-90bb7e52e026', viewValue: 'Administración'},
    {value: 'a57d79bd-dde2-4861-87e8-45db7f69f4e4', viewValue: 'Ventas'},
    {value: '725f1fed-7ecd-48d6-94ca-729067789108', viewValue: 'Desarrollo'},
    {value: '06dafc18-1503-48c8-8639-5cac37d1eeae', viewValue: 'Recursos Humanos'}
  ];
  selectedDept = this.dept[1].value;

  role: Role[] = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'operator', viewValue: 'Operador de Cabina'},
    {value: 'conductor', viewValue: 'Conductor'},
  ];
  selectedRole = this.role[0].value;

  status: Status[] = [
    {value: true, viewValue: 'Activo'},
    {value: false, viewValue: 'Inactivo'},
  ];
  
  newUser: userData = {
    name: '',
    phone: '',
    role: '',
    department: '',
    isActive: false,
    email: '',
    password: ''
  };

  constructor(private apiUserService: ApiUserService, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  addUser() {
    this.apiUserService.addUser(this.newUser).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.users.push(response);
        this.loadUsers();
  
        this.snackBar.open('Usuario creado con éxito.', 'Cerrar', {
          duration: 3000,
        });
        setTimeout(() => {
          location.reload()
        }, 1000);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        if (error.error && error.error.errors) {
          console.error('Errores de validación:', error.error.errors);
        }
      }
    );
  }
  

  loadUsers(): void {
    this.apiUserService.getUser().subscribe(
      (data: userData[]) => {
        this.dataSource = data;
        console.log('Usuarios:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }
}
