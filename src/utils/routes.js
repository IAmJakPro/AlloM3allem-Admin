import React from 'react';
import { DashboardOutlined, UserOutlined } from '@ant-design/icons';

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
    name: 'admins',
    path: '/admins',
    component: <Admins />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_admin',
    name: 'Create admin',
    path: '/admins/create',
    component: <CreateAdmin />,
  },
  {
    key: 'edit_admin',
    name: 'Edit admin',
    path: '/admins/edit/:id',
    component: <EditAdmin />,
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
  },
  {
    key: 'edit_user',
    name: 'Edit user',
    path: '/users/edit/:id',
    component: <EditUser />,
  },

  // Cities
  {
    key: 'cities',
    name: 'Cities',
    path: '/cities',
    component: <Cities />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_city',
    name: 'Create city',
    path: '/cities/create',
    component: <CreateCity />,
  },
  {
    key: 'edit_city',
    name: 'Edit city',
    path: '/cities/edit/:id',
    component: <EditCity />,
  },

  // Services
  {
    key: 'services',
    name: 'Services',
    path: '/services',
    component: <Services />,
    icon: <UserOutlined />,
  },
  {
    key: 'create_service',
    name: 'Create service',
    path: '/services/create',
    component: <CreateService />,
  },
  {
    key: 'edit_service',
    name: 'Edit service',
    path: '/services/edit/:id',
    component: <EditService />,
  },

  // Appointments
  {
    key: 'appointments',
    name: 'Appointments',
    path: '/appointments',
    component: <Appointments />,
    icon: <UserOutlined />,
  },

  // Contracts
  {
    key: 'contracts',
    name: 'Contracts',
    path: '/contracts',
    component: <Contracts />,
    icon: <UserOutlined />,
  },

  // Reviews
  {
    key: 'reviews',
    name: 'Reviews',
    path: '/reviews',
    component: <Reviews />,
    icon: <UserOutlined />,
  },

  // Contacts
  {
    key: 'contacts',
    name: 'Contacts',
    path: '/contacts',
    component: <Contacts />,
    icon: <UserOutlined />,
  },

  // Settings
  {
    key: 'settings',
    name: 'Settings',
    path: '/settings',
    component: <Settings />,
    icon: <UserOutlined />,
  },
];

export default routes;