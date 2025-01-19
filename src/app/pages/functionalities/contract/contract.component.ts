import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { contractData } from 'src/app/domain/contract.domain';

import { ApiContractService } from 'src/app/services/contract.service';
import { ApiPolicyService } from 'src/app/services/policy.service';
import { policyData } from 'src/app/domain/policy.domain';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  selectedPolicy: policyData | null = null;

  constructor(
    private apiContractService: ApiContractService,
    private policiesService: ApiPolicyService
  ) {}

  ngOnInit(): void {
    this.apiContractService.getContracts().subscribe((data) => {
      this.dataSource = data;
    });
  }

  getPolicies() {
    this.policiesService.getPolicy().subscribe((data: policyData[]) => {
      this.policies = data.map((policy) => ({
          id: policy.id,
          name: policy.name,
          monetaryCoverage: policy.monetaryCoverage,
          kmCoverage: policy.kmCoverage,
          baseKmPrice: policy.baseKmPrice,
      }));
      this.selectedPolicy = this.policies.length > 0 ? this.policies[0] : null;
    });
  }
}
