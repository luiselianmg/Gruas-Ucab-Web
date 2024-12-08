import { Injectable, signal } from '@angular/core';
import { widget } from '../modelsWidgets/dashboard';
import { ShowallusersComponent } from '../pages/dashboard/widgets/showallusers/showallusers.component';
import { ShowalldepartmentsComponent } from '../pages/dashboard/widgets/showalldepartments/showalldepartments.component';

@Injectable() // QUITO ROOT PARA QUE SOLO FUNCIONE EN EL DASHBOARD


//servicio para llenar los widgets del dashboard
export class DashboardService { 
  
  //coleccon de widgets
  widgets = signal<widget[]> ([
    {
    id: "1",
    label: "Usuarios Activos",
    context: ShowallusersComponent,
    },
    {
      id: "2",
      label: "Departamentos",
      context: ShowalldepartmentsComponent,
      },
  ]);
   
   
  
  constructor() { }
}
