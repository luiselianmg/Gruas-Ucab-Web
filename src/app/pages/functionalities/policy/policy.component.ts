import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { policyData } from 'src/app/domain/policy.domain';

import { ApiPolicyService } from 'src/app/services/policy.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './policy.component.html',
})
export class AppPolicyComponent implements OnInit {
  // Table
  displayedColumns: string[] = [
    'name',
    'monetaryCoverage',
    'kmCoverage',
    'baseKmPrice',
    'budget',
  ];
  dataSource: policyData[] = [];
  // End Table

  form: FormGroup;

  constructor(private apiPolicyService: ApiPolicyService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      monetaryCoverage: new FormControl('', [Validators.required]),
      kmCoverage: new FormControl('', [Validators.required]),
      baseKmPrice: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.form.controls;
  }

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

  createPolicy() {
    if (this.form.valid) {
      this.apiPolicyService
        .createPolicy(
          this.form.value.name,
          this.form.value.monetaryCoverage,
          this.form.value.kmCoverage,
          this.form.value.baseKmPrice
        )
        .subscribe((success) => {
          if (success) {
            this.apiPolicyService.getPolicy().subscribe((data) => {
              this.dataSource = data;
            });
          }
        });
    }
  }
}
