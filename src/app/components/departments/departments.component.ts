import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

export interface departmentsData {
  id: number;
  imagePath: string;
  name: string;
}

const ELEMENT_DATA: departmentsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/department/image.png',
    name: 'Finanzas',
  },
  {
    id: 2,
    imagePath: 'assets/images/department/image.png',
    name: 'Marketing',
  },
  {
    id: 3,
    imagePath: 'assets/images/department/image.png',
    name: 'Recursos Humanos',
  },
  {
    id: 4,
    imagePath: 'assets/images/department/image.png',
    name: 'Tecnologia',
  },
];

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
export class AppDepartmentsComponent {
  displayedColumns: string[] = ['name'];
  dataSource = ELEMENT_DATA;
}
