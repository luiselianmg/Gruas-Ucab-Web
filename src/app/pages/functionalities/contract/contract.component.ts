import { Component } from '@angular/core';
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

import { contractData } from 'src/app/domain/contract.domain';
import { policyData } from 'src/app/domain/policy.domain';

import { ApiContractService } from 'src/app/services/contract.service';
import { ApiPolicyService } from 'src/app/services/policy.service';

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
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './contract.component.html',
})
export class AppContractComponent {
  // Table
  displayedColumns: string[] = ['numberContract', 'expirationDate'];
  dataSource: contractData[] = [];

  policies: policyData[] = [];
  policiesOptions: { value: string; viewValue: string }[] = [];
  selectedPolicy: string | null = null;

  form: FormGroup;

  constructor(
    private apiContractService: ApiContractService,
    private apiPoliciesService: ApiPolicyService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      contractNumber: ['', Validators.required],
      contractExpirationDate: ['', Validators.required],
      licensePlate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      color: ['', Validators.required],
      km: ['', Validators.required],
      ownerDni: ['', Validators.required],
      ownerName: ['', Validators.required],
      policyId: [null, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadContract();

    this.apiPoliciesService.getPolicy().subscribe((data: policyData[]) => {
      this.policies = data;
      this.policiesOptions = this.policies.map((policy) => ({
        value: policy.id as string,
        viewValue: policy.name,
      }));
    });
  }

  loadContract(): void {
    this.apiContractService.getContracts().subscribe(
      (data: contractData[]) => {
        this.dataSource = data;
        console.log('Contratos:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener los contratos:', error);
      }
    );
  }

  createContract(): void {
    const contractExpirationDate = new Date(this.form.value.contractExpirationDate).toISOString().split('T')[0];
    const newContract: contractData = {
      contractNumber: this.form.value.contractNumber,
      contractExpirationDate: contractExpirationDate,
      licensePlate: this.form.value.licensePlate,
      brand: this.form.value.brand,
      model: this.form.value.model,
      year: this.form.value.year,
      color: this.form.value.color,
      km: this.form.value.km,
      ownerDni: this.form.value.ownerDni,
      ownerName: this.form.value.ownerName,
      policyId: this.form.value.policyId,
    }

    console.log('Datos del nuevo contrato:', newContract); 

    this.apiContractService.createContract(newContract).subscribe(
      (data) => {
        console.log('Contrato creado:', data);
        this.dataSource.push(data);
        this.snackBar.open('Se creo el contrato exitosamente', 'Cerrar', {
          duration: 3000
        });
        this.loadContract();
      },
      (error) => {
        console.error('Error al crear contrato:', error);
      }
    );
  }

}
