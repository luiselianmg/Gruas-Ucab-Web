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
  displayedColumns: string[] = ['numberContract', 'expirationDate'];
  dataSource: contractData[] = [];

  constructor(private apiContractService: ApiContractService) {}

  ngOnInit(): void {
    this.apiContractService.getContracts().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
