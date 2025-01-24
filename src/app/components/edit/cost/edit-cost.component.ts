import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { ExtraCostData } from 'src/app/domain/extra-cost.domain'
import { CostsService } from 'src/app/services/cost.service';

@Component({
  selector: 'app-cost',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-cost.component.html',
})
export class AppEditCostComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppEditCostComponent>,
    public apiCostsService: CostsService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ExtraCostData,
  ) {
    this.form = this.fb.group({
      description: [''],
      defaultPrice: ['']
    });
  }

  ngOnInit(): void {

  }

  get f() {
    return this.form.controls;
  }

  // TODO: Ver porque dice que no si si se guarda
  updateCost(cost: ExtraCostData): void {
    if (!this.form.valid) {
      this.snackBar.open('Por favor, complete todos los campos requeridos', 'Cerrar', {
        duration: 3000
      });
      return;
    }

    this.apiCostsService.updateCost(
      this.data.id,
      this.form.value.description,
      this.form.value.defaultPrice
    ).subscribe((success) => {
      if (success) {
        this.snackBar.open('Costo actualizado exitosamente', 'Cerrar', {
          duration: 100000
        });
        window.location.reload();
      } else {
        this.snackBar.open('Error al actualizar el costo', 'Cerrar', {
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
