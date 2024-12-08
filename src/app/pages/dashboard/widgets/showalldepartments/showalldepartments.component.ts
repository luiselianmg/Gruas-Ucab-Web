import { Component, inject, ViewChild } from '@angular/core';


import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { Department } from '../../../../domain/department';
import { GetAllDepartmentsService } from '../../../../service/get-all-departments.service';

@Component({
  selector: 'app-showalldepartments',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './showalldepartments.component.html',
  styleUrl: './showalldepartments.component.scss'
})
export class ShowalldepartmentsComponent {
  
  private getAllDepartmentsService = inject(GetAllDepartmentsService);
  displayedColumns: string[] = ['name'];
  listdepartments:Department[] = [];
  
  
  isLoadingResults = true;
  isRateLimitReached = false;
  
  basicInfo: Department = {
    id: '',
    name: '',
  };
  
  constructor(){
     this.getAllDepartmentsForTable();
  }
  
  getAllDepartmentsForTable(){
    const { name, id } = this.basicInfo;
    this.getAllDepartmentsService.getAllDepartments(id, name).subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listdepartments = data;
          console.log(this.listdepartments);
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = data === null;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }
  
}
