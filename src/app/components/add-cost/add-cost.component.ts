import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

interface Costs {
  value: string;
  viewValue: string;
  cost: number;
}

@Component({
  selector: 'app-extra-cost-dialog',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    TablerIconsModule,
    MatButtonModule,
  ],
  templateUrl: './add-cost.component.html',
})
export class AppAddCostDialogComponent {
  extraCost: number = 0;
  description: string = '';

  constructor(public dialogRef: MatDialogRef<AppAddCostDialogComponent>) {}


}
