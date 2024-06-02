import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from '@shared/guard/auth.guard';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { ProductsComponent } from './products/products.component';
import { RolesFormComponent } from './roles/roles-form/roles-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'users', component: UsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/form', component: RolesFormComponent },
      { path: 'roles/form/edit/:id', component: RolesFormComponent },
      { path: 'products', component: ProductsComponent },
    ],
  },
];
