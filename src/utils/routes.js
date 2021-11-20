import React from 'react';
import {
  CalendarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  HeatMapOutlined,
  MessageOutlined,
  SettingOutlined,
  StarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Dashboard = React.lazy(() => import('../dashboard/pages/Dashboard'));

const Admins = React.lazy(() => import('../admins/pages/Admins'));
const CreateAdmin = React.lazy(() => import('../admins/pages/CreateAdmin'));
const EditAdmin = React.lazy(() => import('../admins/pages/EditAdmin'));

const Users = React.lazy(() => import('../users/pages/Users'));
const CreateUser = React.lazy(() => import('../users/pages/CreateUser'));
const EditUser = React.lazy(() => import('../users/pages/EditUser'));

const Cities = React.lazy(() => import('../cities/pages/Cities'));
const CreateCity = React.lazy(() => import('../cities/pages/CreateCity'));
const EditCity = React.lazy(() => import('../cities/pages/EditCity'));

const Services = React.lazy(() => import('../services/pages/Services'));
const CreateService = React.lazy(() =>
  import('../services/pages/CreateService')
);
const EditService = React.lazy(() => import('../services/pages/EditService'));

const Appointments = React.lazy(() =>
  import('../appointments/pages/Appointments')
);

const Contracts = React.lazy(() => import('../contracts/pages/Contracts'));

const Reviews = React.lazy(() => import('../reviews/pages/Reviews'));

const Contacts = React.lazy(() => import('../contacts/pages/Contacts'));

const Settings = React.lazy(() => import('../settings/pages/Settings'));

const Pages = React.lazy(() => import('../pages/pages/Pages'));
const CreatePage = React.lazy(() => import('../pages/pages/CreatePage'));
const EditPage = React.lazy(() => import('../pages/pages/EditPage'));

const routes = [
  // Dashboard
  {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/',
    component: <Dashboard />,
    icon: <DashboardOutlined />,
  },

  // Admins
  {
    key: 'admins',
    name: 'Admins',
    path: '/admins',
    component: <Admins />,
    icon: <UserOutlined />,
    permissions: ['super_admin'],
  },
  {
    key: 'create_admin',
    name: 'Create admin',
    path: '/admins/create',
    component: <CreateAdmin />,
    permissions: ['super_admin'],
  },
  {
    key: 'edit_admin',
    name: 'Edit admin',
    path: '/admins/edit/:id',
    component: <EditAdmin />,
    permissions: ['super_admin'],
  },

  // Users
  {
    key: 'users',
    name: 'Users',
    path: '/users',
    component: <Users />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_user',
    name: 'Create user',
    path: '/users/create',
    component: <CreateUser />,
    permissions: ['super_admin', 'admin'],
  },
  {
    key: 'edit_user',
    name: 'Edit user',
    path: '/users/edit/:id',
    component: <EditUser />,
    permissions: ['super_admin', 'admin'],
  },

  // Cities
  {
    key: 'cities',
    name: 'Cities',
    path: '/cities',
    component: <Cities />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_city',
    name: 'Create city',
    path: '/cities/create',
    component: <CreateCity />,
    permissions: ['super_admin', 'admin'],
  },
  {
    key: 'edit_city',
    name: 'Edit city',
    path: '/cities/edit/:id',
    component: <EditCity />,
    permissions: ['super_admin', 'admin'],
  },

  // Services
  {
    key: 'services',
    name: 'Services',
    path: '/services',
    component: <Services />,
    icon: <UnorderedListOutlined />,
  },
  {
    key: 'create_service',
    name: 'Create service',
    path: '/services/create',
    component: <CreateService />,
    permissions: ['super_admin', 'admin'],
  },
  {
    key: 'edit_service',
    name: 'Edit service',
    path: '/services/edit/:id',
    component: <EditService />,
    permissions: ['super_admin', 'admin'],
  },

  // Appointments
  {
    key: 'appointments',
    name: 'Appointments',
    path: '/appointments',
    component: <Appointments />,
    icon: <CalendarOutlined />,
  },

  // Contracts
  {
    key: 'contracts',
    name: 'Contracts',
    path: '/contracts',
    component: <Contracts />,
    icon: <FileDoneOutlined />,
  },

  // Reviews
  {
    key: 'reviews',
    name: 'Reviews',
    path: '/reviews',
    component: <Reviews />,
    icon: <StarOutlined />,
  },

  // Contacts
  {
    key: 'contacts',
    name: 'Contacts',
    path: '/contacts',
    component: <Contacts />,
    icon: <MessageOutlined />,
  },

  // Pages
  {
    key: 'pages',
    name: 'Pages',
    path: '/pages',
    component: <Pages />,
    icon: <HeatMapOutlined />,
  },
  {
    key: 'create_page',
    name: 'Create page',
    path: '/pages/create',
    component: <CreatePage />,
    permissions: ['super_admin', 'admin'],
  },
  {
    key: 'edit_page',
    name: 'Edit page',
    path: '/pages/edit/:id',
    component: <EditPage />,
    permissions: ['super_admin', 'admin'],
  },

  // Settings
  {
    key: 'settings',
    name: 'Settings',
    path: '/settings',
    component: <Settings />,
    icon: <SettingOutlined />,
    permissions: ['super_admin', 'admin'],
  },
];

export default routes;
