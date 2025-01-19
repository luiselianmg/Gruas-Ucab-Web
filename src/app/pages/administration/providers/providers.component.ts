import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { providerData } from 'src/app/domain/provider.domain';
import { ApiProviderService } from 'src/app/services/provider.service';

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
  ],
  templateUrl: './providers.component.html',
})
export class AppProvidersComponent implements OnInit {
    // Table
    displayedColumns: string[] = ['imagePath', 'rif', 'name', 'budget'];
    dataSource: providerData[] = [];

    providerStatus: string[] = ['Activo', 'Inactivo'];

    constructor (private apiProviderService: ApiProviderService) {}

    ngOnInit(): void {
        this.loadProviders();
    }

    loadProviders(): void {
        this.apiProviderService.getProviders().subscribe((providers) => {
            this.dataSource = providers;
        });
    }

    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
    
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log('Archivo seleccionado:', file);    
      }
    }
}
