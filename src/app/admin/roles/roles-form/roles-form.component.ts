import { Component } from '@angular/core';
import { DataService } from '@shared/data/data.service';
import { RolesService } from '../roles.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbComponent } from '../../admin-layout/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-roles-form',
  standalone: true,
  imports: [FormsModule, CommonModule, BreadcrumbComponent],
  templateUrl: './roles-form.component.html',
})
export class RolesFormComponent {
  public title: string = '';
  sideBar: any = [];
  name: string = '';
  permissions: any = [];
  valid_form: boolean = false;
  valid_form_success: boolean = false;
  text_validation: any = null;
  role_id: any;
  public type_form: number = 1;
  public name_button = 'Guardar Registro';

  public route: string = '';
  public breadcumb: string = 'Roles-Agregar';
  constructor(
    public DataService: DataService,
    public RoleService: RolesService,
    private router: Router,
    public activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route = this.router.url;
    this.sideBar = this.DataService.rolesList[0].menu;
    this.activedRoute.params.subscribe((resp: any) => {
      if (resp.id) {
        this.type_form = 2;
        this.role_id = resp.id;
        this.showRole();
      }
    });
  }
  //PARA EDICION DEL FORMULARIO
  showRole() {
    this.name_button = 'Editar Registro';
    this.RoleService.showRoles(this.role_id).subscribe((resp: any) => {
      /* console.log(resp); */
      this.name = resp.name;
      this.permissions = resp.permision_pluck;
    });
  }

  addPermission(subMenu: any) {
    if (subMenu.permision) {
      let INDEX = this.permissions.findIndex(
        (item: any) => item == subMenu.permision
      );
      if (INDEX != -1) {
        this.permissions.splice(INDEX, 1);
      } else {
        this.permissions.push(subMenu.permision);
      }
      console.log(this.permissions);
    }
  }

  save() {
    /*  alert(this.name); 
    this.valid_form = false;*/

    if (!this.name || this.permissions.length == 0) {
      this.valid_form = true;
      return;
    }
    let data = {
      name: this.name,
      permisions: this.permissions,
    };
    this.valid_form_success = false;
    this.text_validation = null;
    if (this.type_form === 1) {
      this.RoleService.storeRoles(data).subscribe((resp: any) => {
        console.log(resp);
        if (resp.message == 403) {
          this.text_validation = resp.message_text;
        } else {
          this.router.navigateByUrl('admin/roles');
          this.name = '';
          this.permissions = [];
          this.valid_form_success = true;

          let SIDE_BAR = this.sideBar;
          this.sideBar = [];
          setTimeout(() => {
            this.sideBar = SIDE_BAR;
          }, 50);
        }
      });
    } else {
      this.RoleService.editRoles(data, this.role_id).subscribe((resp: any) => {
        console.log(resp);
        if (resp.message == 403) {
          this.text_validation = resp.message_text;
          return;
        }
        this.router.navigateByUrl('admin/roles');
        this.valid_form_success = true;
      });
    }
  }
}
