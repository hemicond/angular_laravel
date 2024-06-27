import { Component, inject } from '@angular/core';
import { CrudService } from '../../components/crud/crud.service';
import { NavPaginationComponent } from '../../components/crud/navPagination.component';
import { BreadcrumbComponent } from '../admin-layout/breadcrumb/breadcrumb.component';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from './users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    NavPaginationComponent,
    BreadcrumbComponent,
    RouterLink,
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public title: string = 'Usuarios';
  public breadcumb: string = 'Usuarios';
  public route: string = '';
  public user: any;
  public usersList: any = [];
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  public role_generals: any = [];
  public skip = 0; //MIN
  public pageSize = 10;
  public limit: number = this.pageSize; //MAX
  /*   public crudService = inject(CrudService);

  getData(data: any) {
    console.log(data);
  } */
  constructor(public usuarioService: UsersService, private router: Router) {}
  ngOnInit() {
    this.route = this.router.url;
    this.getTableData();
    this.user = this.usuarioService.authService.user;
  }

  isPermision(permission: string) {
    if (this.user.roles.includes('Super-Admin')) {
      return true;
    }
    if (this.user.permissions.includes(permission)) {
      return true;
    }
    return false;
  }

  private getTableData(): void {
    this.usersList = [];
    this.serialNumberArray = [];

    this.usuarioService.listUsers().subscribe((resp: any) => {
      console.log(resp);

      this.totalData = resp.users.data.length;
      this.role_generals = resp.users.data;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.usersList = [];
    this.serialNumberArray = [];

    this.role_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.usersList.push(res);
        this.serialNumberArray.push(serialNumber);

        console.log(this.usersList, this.serialNumberArray);
      }
    });
    /*    this.dataSource = new MatTableDataSource<any>(this.usersList);
    this.calculateTotalPages(this.totalData, this.pageSize); */
  }
}
