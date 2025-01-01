import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Principal',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    navCap: 'Funcionalidades',
  },
  {
    displayName: 'Ordenes',
    iconName: 'package',
    route: '/functionalities/orders',
  },
  {
    displayName: 'Costos',
    iconName: 'cash',
    route: '/functionalities/costs',
  },
  {
    displayName: 'Grúas', 
    iconName: 'car-crane',
    route: '/functionalities/crane',
  },
  {
    displayName: 'Polizas',
    iconName: 'file-text',
    route: '/functionalities/policy',
  },
  {
    displayName: 'Vehiculos',
    iconName: 'car-suv',
    route: '/functionalities/vehicle',
  },
  {
    navCap: 'Administración',
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    route: '/administration/users',
  },
  {
    displayName: 'Roles',
    iconName: 'ghost',
    route: '/administration/roles',
  },
  {
    displayName: 'Permisos',
    iconName: 'key',
    route: '/administration/permits',
  },
];
