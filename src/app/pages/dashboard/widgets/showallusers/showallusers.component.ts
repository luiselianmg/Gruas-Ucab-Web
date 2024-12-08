import { Component, inject } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LocalserviceuserService } from '../../../../service/localserviceuser.service';
import {  UserBasicInfo } from '../../../../domain/user';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-showallusers',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatTableModule, MatSortModule, MatPaginatorModule, MatChipsModule],
  templateUrl: './showallusers.component.html',
  styleUrl: './showallusers.component.scss'
})
export class ShowallusersComponent {
  
  private localuserService = inject(LocalserviceuserService);
  displayedColumns: string[] = ['name', 'phone', 'rol', 'isActive'];
  listusers:UserBasicInfo[] = [];
  
  
  isLoadingResults = true;
  isRateLimitReached = false;
  
  basicInfo: UserBasicInfo = {
    name: '',
    phone: '',
    role: 'Admin',
    isActive: true
  };
  
  constructor(){
     this. getAllUsersForTable();
  }
  
  getAllUsersForTable(){
    const { name, phone, role, isActive } = this.basicInfo;
    this.localuserService.getUserBasicInfo(name, phone, role, isActive).subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listusers = data;
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