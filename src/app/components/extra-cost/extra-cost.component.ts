import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


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
    public dialogRef: MatDialogRef<AppExtraCostComponent>,
    @Inject(MAT_DIALOG_DATA) public order: orderAllData
  ) { }

  ngOnInit(): void {
    console.log('Order data:', this.order);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}