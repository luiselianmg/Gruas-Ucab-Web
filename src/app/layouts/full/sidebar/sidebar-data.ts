import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  { navCap: 'Principal', roles: ['admin', 'operator', 'provider'] },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
    roles: ['admin', 'operator', 'provider'],
  },
  { navCap: 'Funcionalidades', roles: ['admin', 'operator', 'provider'] },
  {
    displayName: 'Ordenes',
    iconName: 'package',
    route: '/functionalities/orders',
    roles: ['admin', 'operator'],
  },
  {
    displayName: 'Costos',
    iconName: 'cash',
    route: '/functionalities/costs',
    roles: ['admin', 'operator'],
  },
  {
    displayName: 'Grúas',
    iconName: 'car-crane',
    route: '/functionalities/crane',
    roles: ['admin', 'provider'],
  },
  {
    displayName: 'Polizas',
    iconName: 'file-text',
    route: '/functionalities/policy',
    roles: ['admin'],
  },
  {
    displayName: 'Contratos',
    iconName: 'signature',
    route: '/functionalities/contract',
    roles: ['admin', 'operator'],
  },
  {
    displayName: 'Vehiculos',
    iconName: 'car-suv',
    route: '/functionalities/vehicle',
    roles: ['admin', 'operator'],
  },
  { navCap: 'Administración', roles: ['admin'] },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    route: '/administration/users',
    roles: ['admin'],
  },
  {
    displayName: 'Proveedores',
    iconName: 'address-book',
    route: '/administration/providers',
    roles: ['admin'],
  },
];
