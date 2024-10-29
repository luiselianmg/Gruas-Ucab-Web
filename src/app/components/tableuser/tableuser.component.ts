import { Component , inject} from '@angular/core';
import { RegisterPostData,User } from '../../interfaces/auth';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { GetUserService } from '../../services/getalluser.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tableuser',
  standalone: true,
  imports: [TableModule,
    CommonModule],
  templateUrl: './tableuser.component.html',
  styleUrl: './tableuser.component.css',
  
})
export class TableuserComponent {
  private getUserService = inject(GetUserService);
  public listaUsers:User[] = [];
  
  getAllUsers(){
    this.getUserService.listsUsers().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaUsers = data;
          console.log(data)
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){

    this.getAllUsers();
  }
}
