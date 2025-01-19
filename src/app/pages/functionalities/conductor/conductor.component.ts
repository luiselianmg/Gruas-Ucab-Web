import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { conductorData } from 'src/app/domain/conductor.domain';

import { ApiOrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-conductor',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './conductor.component.html',
})
export class AppConductorComponent implements OnInit {
  // Table
  displayedColumns: string[] = [
    'image',
    'dni',
    'name',
    'assignedCrane',
    'isActive',
    'actions',
  ];
  dataSource: conductorData[] = [];
  // End Table

  form: FormGroup;

  constructor(
    private apiOrderService: ApiOrderService) {
    this.form = new FormGroup({
      dni: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      Image: new FormControl('', [Validators.required]),
      assignedCrane: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required
      ]),
      
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.loadConductor();
  }

  loadConductor(): void {
    this.apiOrderService.getConductors().subscribe(
      (data: conductorData[]) => {
        this.dataSource = data;
        console.log('Conductores:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener los conductores:', error);
      }
    );
  }

  // createPolicy() {
  //   if (this.form.valid) {
  //     this.apiOrderService
  //       .createPolicy(
  //         this.form.value.name,
  //         this.form.value.monetaryCoverage,
  //         this.form.value.kmCoverage,
  //         this.form.value.baseKmPrice
  //       )
  //       .subscribe((success) => {
  //         if (success) {
  //           this.apiOrderService.getPolicy().subscribe((data) => {
  //             this.dataSource = data;
  //           });
  //         }
  //       });
  //   }
  // }
}
