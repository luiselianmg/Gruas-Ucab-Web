import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { ExtraCostData } from '../../domain/extra-cost.domain';
import { orderAllData } from '../../domain/orderAll.domain';

import { CostsService } from '../../services/cost.service';

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
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-cost.component.html',
})
export class AppAddCostDialogComponent implements OnInit {
  cost: ExtraCostData[] = [];
  costOptions: { value: string; viewValue: string; price: number }[] = [];
  selectedCost: string | null = null;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppAddCostDialogComponent>,
    public dialog: MatDialog,
    private costsService: CostsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { order: orderAllData }
  ) { 
        this.form = this.fb.group({
          costs: [null, Validators.required],
        });
   }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.costsService.getCosts().subscribe(async (costo: ExtraCostData[]) => {
      this.cost = costo;
      console.log('Costos traidos:', this.cost);
      this.costOptions = await Promise.all(this.cost.map(async (cost) => {
        return {
          value: cost.id as string,
          viewValue: cost.description,
          price: cost.price,
        };
      }));
    });
  }

  patchExtraCost(data: ExtraCostData): void {
    const selectedCost = this.form.value.costs;
    console.log('Datos del formulario:', selectedCost);
    this.costsService.patchExtraCost(
      this.data.order.id,
      selectedCost.description,
      selectedCost.id,
      selectedCost.price,
    ).subscribe((success) => {
      if (success) {
        this.snackBar.open('Costo asignado exitosamente', 'Cerrar', {
          duration: 5000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error al asignar el costo', 'Cerrar', {
          duration: 3000
        });
      }
    },
      (error) => {
        console.error('Error al actualizar el costo:', error);
        this.snackBar.open('Error al actualizar el costo', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }



}
