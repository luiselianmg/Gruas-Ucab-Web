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
        console.log('cost ID:', cost.id);
        return {
          value: cost.id as string,
          viewValue: cost.description,
          price: cost.price,
        };
      }));
    });
  }


  patchExtraCost(): void {
    const {id, description, price} = this.form.value.costs;
    const newOrder : ExtraCostData = {
      id: id,
      description: description,
      price: price,
    }
    console.log('Orden a Asignar:', this.data.order.id);
    console.log('Costo a asignar:', newOrder);
    this.costsService.patchExtraCost(this.data.order.id, newOrder).subscribe(
        (data) => {
          this.cost.push(data);
          this.snackBar.open('Costo asignado con exito', 'Cerrar', {
            duration: 2000,
          });
          this.dialogRef.close(this.cost);
        },
        (error) => {
          console.error('Error al asignar el costo: ', error);
          this.snackBar.open('Error al asignar el costo:', 'Cerrar', {
            duration: 2000,
          });
        }
    );  
  }
}
