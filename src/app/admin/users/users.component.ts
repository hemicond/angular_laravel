import { Component, inject } from '@angular/core';
import { CrudService } from '../../components/crud/crud.service';
import { NavPaginationComponent } from '../../components/crud/navPagination.component';
import { BreadcrumbComponent } from '../admin-layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavPaginationComponent, BreadcrumbComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  public title: string = 'Usuarios';
  public breadcumb: string = 'Usuarios';
  public crudService = inject(CrudService);

  getData(data: any) {
    console.log(data);
  }
}
