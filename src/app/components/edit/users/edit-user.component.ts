import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { userData } from 'src/app/domain/user.domain';


@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-user.cpmponent.html',
})
export class AppEditUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AppEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userData,
  ) { }

  ngOnInit(): void {
    
  }
}
