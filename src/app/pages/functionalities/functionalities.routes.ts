import { Routes } from '@angular/router';

// functionalities
import { AppOrdersComponent } from './orders/orders.component';
import { AppCostsComponent } from './costs/costs.component';
import { AppCraneComponent } from './crane/crane.component';
import { AppPolicyComponent } from './policy/policy.component';
import { AppContractComponent } from './contract/contract.component';
import { AppVehicleComponent } from './vehicle/vehicle.component';
import { AppConductorComponent } from './conductor/conductor.component';

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
        path: 'contract',
        component: AppContractComponent,
      },
      {
        path: 'vehicle',
        component: AppVehicleComponent,
      },
      {
        path: 'conductor',
        component: AppConductorComponent,
      },
    ],
  },
];
