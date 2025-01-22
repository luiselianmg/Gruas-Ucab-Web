import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { policyData } from 'src/app/domain/policy.domain';
import { ApiPolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-user',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-policy.cpmponent.html',
})
export class AppEditPolicyComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppEditPolicyComponent>,
    public apiPoliciesService: ApiPolicyService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: policyData,
  ) {     
    this.form = this.fb.group({
      name: ['',],
      monetaryCoverage: ['',],
      kmCoverage: ['',],
      baseKmPrice: ['',],
  });
}

  ngOnInit(): void {
    
  }

  get f() {
    return this.form.controls;
  }

  updatePolicy(policy: policyData): void {
    this.apiPoliciesService.updatePolicy(
      this.data.id,
      this.form.value.name,
      this.form.value.monetaryCoverage,
      this.form.value.kmCoverage,
      this.form.value.baseKmPrice
    ).subscribe((success) => {
        if (success) {
          this.snackBar.open('Poliza actualizada exitosamente', 'Cerrar', {
            duration: 5000
          });
          window.location.reload();
        } else {
          this.snackBar.open('Error al actualizar poliza', 'Cerrar', {
            duration: 3000
          });
        }
      },
      (error) => {
        console.error('Error al actualizar poliza:', error);
        this.snackBar.open('Error al actualizar poliza', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
}
