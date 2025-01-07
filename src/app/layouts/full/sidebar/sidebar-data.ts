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
    displayName: 'Contratos',
    iconName: 'building-carousel',
    route: '/functionalities/contract',
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
    displayName: 'Proveedores',
    iconName: 'address-book',
    route: '/administration/providers',
  },
  {
    displayName: 'Password',
    iconName: 'password',
    route: '/authentication/forgot-pwd',
  },
];
