import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContractData, VehicleData} from 'src/app/domain/contract.domain';
import { ContractService } from 'src/app/services/contract.service';
import { policyData } from 'src/app/domain/policy';

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
  ],
  templateUrl: './contract.component.html',
})
export class AppContractComponent {
  // Table
  displayedColumns1: string[] = ['imagePath', 'number', 'vehicle', 'policy' ,'endDate', 'isActive', 'budget'];

  // Select
  policy: policyData[] = [ ];

  craneStatus: string[] = ['Activa', 'Inactiva'];

    // // Select
    // type: VehicleData[] = [
    //   { value: 'Ligero' },
    //   { value: 'Mediano' },
    //   { value: 'Pesado' },
    // ];
    // selectedType = this.type[0].value;
    // // End Select

    contracts: ContractData[] = [];
    constructor(private contractService: ContractService) { }

    ngOnInit(): void {
      this.loadContracts();
    }

    loadContracts(): void {
      this.contractService.getContracts().subscribe(
        (data: ContractData[]) => {
          this.contracts = data;
          console.log('Contratos:', this.contracts);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

}
