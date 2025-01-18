import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { ApiPolicyService } from 'src/app/services/policy.service';
import { policyData } from 'src/app/domain/policy.domain';

interface Type {
  value: string;
}

@Component({
  selector: 'app-policy',
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
  templateUrl: './policy.component.html',
})
export class AppPolicyComponent implements OnInit {
    // Table
    displayedColumns: string[] = ['name', 'monetaryCoverage', 'kmCoverage', 'baseKmPrice' ,'budget'];
    dataSource: policyData[] = [];
    // End Table

    // Select
    type: Type[] = [
      { value: 'Oro' },
      { value: 'Plata' },
      { value: 'Bronce' },
    ];
    selectedType = this.type[0].value;
    // End Select

    policy: policyData[] = [];

    constructor(private apiPolicyService: ApiPolicyService) { }

    ngOnInit(): void {
      this.loadPolicy();
    }
    
    loadPolicy(): void {
      this.apiPolicyService.getPolicy().subscribe(
        (data: policyData[]) => {
          this.dataSource = data;
          console.log('Polizas:', this.dataSource);
        },
        (error) => {
          console.error('Error al obtener las polizas:', error);
        }
      );
  }    
}
