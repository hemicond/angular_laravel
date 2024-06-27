import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RolesService } from '../../roles/roles.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  public user: any;
  constructor(public RoleService: RolesService) {}

  ngOnInit() {
    this.user = this.RoleService.authService.user;
  }
  @Input() breadcumb?: string;
  @Input() route?: string;

  public title: string = 'Roles';

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
