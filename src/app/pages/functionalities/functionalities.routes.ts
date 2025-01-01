import { Routes } from '@angular/router';

// functionalities
import { AppOrdersComponent } from './orders/orders.component';
import { AppCostsComponent } from './costs/costs.component';
import { AppCraneComponent } from './crane/crane.component';
import { AppPolicyComponent } from './policy/policy.component';
import { AppVehicleComponent } from './vehicle/vehicle.component';

export const FunctionalitiesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'orders',
        component: AppOrdersComponent,
      },
      {
        path: 'costs',
        component: AppCostsComponent,
      },
      {
        path: 'crane',
        component: AppCraneComponent,
      },
      {
        path: 'policy',
        component: AppPolicyComponent,
      },
      {
        path: 'vehicle',
        component: AppVehicleComponent,
      },
    ],
  },
];
