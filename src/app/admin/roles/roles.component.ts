import { Component, signal } from '@angular/core';
import { RolesService } from './roles.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../admin-layout/breadcrumb/breadcrumb.component';
import { initFlowbite } from 'flowbite';
import { NavPaginationComponent } from '../../components/crud/navPagination.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    BreadcrumbComponent,
    NavPaginationComponent,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  public title: string = 'Roles';
  public rolesList: any = [];
  public rolList: any = [];
  public totalData = 0;
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public role_generals: any = [];
  public skip = 0; //MIN
  public limit: number = this.pageSize; //MAX
  public roles = signal<any>([]);
  public user: any;
  public breadcumb: string = 'Roles';
  public route: string = '';
  public currentPage = 1;
  public pageIndex = 0;
  public pageSelection: Array<any> = [];
  public searchDataValue = '';
  public pageNumberArray: Array<number> = [];

  public totalPages = 0;
  constructor(public RoleService: RolesService, private router: Router) {}
  ngOnInit() {
    this.route = this.router.url;

    this.getTableData();
    this.user = this.RoleService.authService.user;
    initFlowbite();
  }

  private getTableData(): void {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.RoleService.listRoles().subscribe((resp: any) => {
      this.rolList = resp;
      console.log(this.rolList);
      this.totalData = resp.data.length;

      this.role_generals = resp.data;
      this.getTableDataGeneral();
    });
  }

  getTableDataGeneral() {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.role_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.rolesList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
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
  /* 
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.rolesList = this.dataSource.filteredData;
  } */

  public sortData(sort: any) {
    const data = this.rolesList.slice();

    if (!sort.active || sort.direction === '') {
      this.rolesList = data;
    } else {
      this.rolesList = data.sort((a: any, b: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.getTableDataGeneral();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
      // 1
      // 0 - 10
      // 2
      // 10 - 20
    }
  }

  /*   public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.rolesList = this.dataSource.filteredData;
  } */
}
