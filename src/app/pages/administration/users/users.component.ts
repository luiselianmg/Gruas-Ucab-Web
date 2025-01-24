import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

import { ApiUserService } from 'src/app/services/user.service';
import { userData } from '../../../domain/user.domain';

import { ApiDepartmentService } from 'src/app/services/departament.service';
import { departmentData } from '../../../domain/department.domain';
import { AppEditUserComponent } from 'src/app/components/edit/users/edit-user.component';

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
    FormsModule,
    MatDialogModule
    ],
  templateUrl: './users.component.html',
})
export class AppUsersComponent implements OnInit {
  
  imagePaths: string[] = [
    'assets/images/profile/user-1.jpg',
    'assets/images/profile/user-2.jpg',
    'assets/images/profile/user-3.jpg',
    'assets/images/profile/user-4.jpg'
  ];

  getImagePath(index: number): string {
    return this.imagePaths[index % this.imagePaths.length];
  }

  // Table
  displayedColumns: string[] = ['name', 'phone', 'department', 'role', 'isActive', 'budget'];
  dataSource: userData[] = [];

  dept: departmentData[] = [];
  deptOptions: { value: string; viewValue: string }[] = [];
  selectedDept: string | null = null;

  // Formulario de creación de usuario
  users: userData[] = [];

  getDepartmentName(departmentId: string): string {
    const department = this.dept.find(dept => dept.id === departmentId);
    return department ? department.name : 'Unknown';
  }

  // Select
  role: Role[] = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'operator', viewValue: 'Operador de Cabina'},
    {value: 'conductor', viewValue: 'Conductor'},
    {value: 'provider', viewValue: 'Proveedor'},
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

  constructor(
    private apiUserService: ApiUserService, 
    private ApiDepartmentService: ApiDepartmentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    this.ApiDepartmentService.getDepartments().subscribe((data: departmentData[]) => {
      this.dept = data;
      this.deptOptions = this.dept.map((dept) => ({
        value: dept.id as string,
        viewValue: dept.name,
      }));
    });

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
          if (error.error && error.error.errors) {
            console.error('Errores de validación:', error.error.errors);
            this.snackBar.open('Error de Validacion: ', error.error.error, {
              duration: 3000,
            });
          }
        }
      }
    );
  }

  toggleUserStatus(user: userData): void {
    const updatedStatus = !user.isActive;
    this.apiUserService.patchUserStatus(user.id!, { isActive: updatedStatus }).subscribe(
      (response) => {
        user.isActive = updatedStatus;
        this.snackBar.open('Estatus Actualizado Satisfactoriamente.', 'Close', {
          duration: 50000,
        });
      },
      (error) => {
        console.error('Error Actualizando el Estatus', error);
        this.snackBar.open('Error Actualizando el Estatus.', 'Close', {
          duration: 50000,
        });
      }
    );
  }



  openEditDialog(user: userData): void {
    this.dialog.open(AppEditUserComponent, {
      width: '600px',
      maxHeight: '500px',
      data: user,
    });
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
