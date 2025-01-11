import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

import { ApiDepartmentService } from 'src/app/services/departament.service';
import { departmentData } from '../../domain/department.domain';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    NgApexchartsModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
  ],
  templateUrl: './departments.component.html',
})
export class AppDepartmentsComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: departmentData[] = [];

  constructor(private apiDepartmentService: ApiDepartmentService) {}

  ngOnInit(): void {
    this.apiDepartmentService.getDepartments().subscribe(
      (data: departmentData[]) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }
}
