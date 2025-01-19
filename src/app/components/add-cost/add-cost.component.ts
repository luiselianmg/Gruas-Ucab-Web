import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ExtraCostData } from '../../domain/extra-cost.domain';
import { orderAllData } from '../../domain/orderAll.domain';

import { CostsService } from '../../services/cost.service';


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
export class AppAddCostDialogComponent implements OnInit {
  cost: ExtraCostData[] = [];
  costOptions: { value: string; viewValue: string; numberValue: number }[] = [];
  selectedCost: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<AppAddCostDialogComponent>,
    public dialog: MatDialog,
    private costsService: CostsService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { order: orderAllData }
  ) { }

  ngOnInit(): void {

    this.costsService.getCosts().subscribe((data: ExtraCostData[]) => {
      this.cost = data;
      this.costOptions = data.map(cost => ({
        value: cost.id,
        viewValue: cost.description,
        numberValue: cost.price
      }));
      this.selectedCost = this.costOptions.length > 0 ? this.costOptions[0].value : null;
    });

  }

  onAddCost(): void {
    if (this.selectedCost) {
      this.costsService.patchExtraCost(this.data.order.id, { id: this.selectedCost })
        .subscribe((response) => {
          if (response) {
            this.snackBar.open('Costo agregado correctamente', 'Cerrar', {
              duration: 3000
            });
            this.dialogRef.close(true);
          }
        });
    }
  }

}
