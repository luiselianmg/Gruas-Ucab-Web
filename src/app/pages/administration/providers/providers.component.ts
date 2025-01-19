import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { providerData } from 'src/app/domain/provider.domain';
import { userData } from 'src/app/domain/user.domain';

import { ApiProviderService } from 'src/app/services/provider.service';
import { ApiUserService } from 'src/app/services/user.service';

interface isActive {
  value: boolean;
  viewValue: string;
}

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
    ReactiveFormsModule
  ],
  templateUrl: './providers.component.html',
})
export class AppProvidersComponent implements OnInit {
    // Table
    displayedColumns: string[] = ['imagePath', 'rif', 'name', 'budget'];
    dataSource: providerData[] = [];

    user: userData[] = [];
    userOptions: { value: string; viewValue: string, idValue: string }[] = [];
    selectedUser: string | null = null;

    form: FormGroup;
    
    providerStatus: string[] = ['Activo', 'Inactivo'];

    constructor (
      private apiProviderService: ApiProviderService,
      private ApiUserService: ApiUserService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar      
    ) {
        this.form = this.fb.group({
          provider: [null, Validators.required],
          rif: ['', Validators.required],
          image: ['../../../../assets/images/profile/user-3.jpg'],
        });
    }

    get f() {
      return this.form.controls;
    }

    ngOnInit(): void {
        this.loadProviders();

        this.apiProviderService.getUser().subscribe((users) => {
          this.user = users.filter(user => user.role === 'provider');
          this.userOptions = this.user.map((user) => ({
            value: user.name as string,
            viewValue: user.name,
            idValue: user.id as string
          }));
        });
    }

    loadProviders(): void {
        this.apiProviderService.getProviders().subscribe((providers) => {
            this.dataSource = providers;
        });
    }

    createProvider(): void {
      const { id, name } = this.form.value.provider;
      const rif = this.form.value.rif;
      const image = this.form.value.image;
  
      const newProvider: providerData = {
        id: id,
        name: name,
        rif: rif,
        image: image,
      }
      this.apiProviderService.createProvider(newProvider).subscribe(
        (data) => {
          console.log('Proveedor creado:', data);
          this.dataSource.push(data);
          this.snackBar.open('Proveedor creado', 'Cerrar', {
            duration: 2000,
          });
          this.loadProviders();
        },
        (error) => {
          console.error('Error al crear proveedor:', error);
          this.snackBar.open('Error al crear proveedor', 'Cerrar', {
            duration: 2000,
          });
        }
      );
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
    
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log('Archivo seleccionado:', file);    
      }
    }
}
