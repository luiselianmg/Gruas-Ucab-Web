import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { contractData, contractAllData } from 'src/app/domain/contract.domain';
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
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contract.component.html',
})
export class AppContractComponent {

  imagePaths: string[] = [
    'assets/images/contract/contract-1.png',
    'assets/images/contract/contract-2.png',
    'assets/images/contract/contract-3.png',
    'assets/images/contract/contract-4.png',
  ];

  getImagePath(index: number): string {
    return this.imagePaths[index % this.imagePaths.length];
  }

  // Table
  displayedColumns: string[] = ['contractNumber', 'expirationDate'];
  dataSource: contractData[] = [];
  dataSource1: contractAllData[] = [];

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
      (data: contractAllData[]) => {
        this.dataSource1 = data;
        console.log('Contratos:', this.dataSource1);
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
        window.location.reload();
      },
      (error) => {
        console.error('Error al crear contrato:', error);
        this.snackBar.open('Error al crear contrato', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

}
