import { Component, signal } from '@angular/core';
import { RolesService } from './roles.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../admin-layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterLink, CommonModule, BreadcrumbComponent],
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
  constructor(public RoleService: RolesService) {}
  ngOnInit() {
    this.getTableData();
    this.user = this.RoleService.authService.user;
  }

  private getTableData(): void {
    this.rolesList = [];
    this.serialNumberArray = [];

    this.RoleService.listRoles().subscribe((resp: any) => {
      this.rolList = resp;
      console.log(this.rolList);
      this.totalData = resp.roles.length;
      this.role_generals = resp.roles;
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
}
