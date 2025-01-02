import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface policyData {
  imagePath: string;
  name: string;
  kmcoverage: string;
  moneycoverage: string;
}

interface Type {
  value: string;
}

const POLICY_DATA: policyData[] = [
  { imagePath: 'assets/images/policy/bronce.png', name: 'Bronce', kmcoverage: '100,000 km', moneycoverage: '$100,000'},
  { imagePath: 'assets/images/policy/silver.png', name: 'Plata', kmcoverage: '300,000 km', moneycoverage: '$300,000'},
  { imagePath: 'assets/images/policy/oro.png', name: 'Oro', kmcoverage: '500,000 km', moneycoverage: '$500,000'},
];


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
export class AppPolicyComponent {
    // Table
    displayedColumns1: string[] = ['class', 'name', 'kmcoverage', 'moneycoverage', 'budget'];
    dataSource1 = POLICY_DATA;
    // End Table

    // Select
    type: Type[] = [
      { value: 'Oro' },
      { value: 'Plata' },
      { value: 'Bronce' },
    ];
    selectedType = this.type[0].value;
    // End Select

}
