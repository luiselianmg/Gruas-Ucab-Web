import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { AppAddCostDialogComponent } from '../add-cost/add-cost.component';
import { ApiOrderService } from 'src/app/services/order.service';
import { orderData } from 'src/app/domain/order.domain';


import { orderAllData } from '../../domain/orderAll.domain';

@Component({
  selector: 'app-extra-cost',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule, 
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './extra-cost.component.html',
})
export class AppExtraCostComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private apiOrderService: ApiOrderService,
    @Inject(MAT_DIALOG_DATA) public order: orderAllData
  ) { }

  ngOnInit(): void {
    console.log('Order data:', this.order);
  }

  openAddCostDialog(): void {
    const dialogRef = this.dialog.open(AppAddCostDialogComponent, {
      width: '250px',
      data: { description: '', extraCost: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.addExtraCost(result.description, result.extraCost);
      }
    });
  }


}
