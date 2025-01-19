import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { craneData } from 'src/app/domain/crane.domain';

import { ApiCraneService } from 'src/app/services/crane.service';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-crane',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './crane.component.html',
})
export class AppCraneComponent implements OnInit{
  // Table
  displayedColumns: string[] = ['brand', 'model', 'plate' ,'year', 'type', 'budget'];
  dataSource: craneData[] = [];

  constructor
  (
    private ApiCraneService: ApiCraneService
  ) { }

  // Select
  type: Type[] = [
    { value: 'light', viewValue: 'Ligera' },
    { value: 'medium', viewValue: 'Media' },
    { value: 'heavy', viewValue: 'Pesada' },
  ];
  selectedType = this.type[0].value;  
  // End Select

  ngOnInit(): void {
    this.loadCrane();
  }

  loadCrane(): void {
    this.ApiCraneService.getCranes().subscribe(
      (data: craneData[]) => {
        this.dataSource = data;
        console.log('Gruas:', this.dataSource);
      },
      (error) => {
        console.error('Error al obtener las gruas:', error);
      }
    );
  }

  getImagePath(type: string): string {
    switch (type) {
      case 'light':
        return 'assets/images/light.png';
      case 'medium':
        return 'assets/images/medium.png';
      case 'heavy':
        return 'assets/images/heavy.png';
      default:
        return 'assets/images/default.png';
    }
  }

}
