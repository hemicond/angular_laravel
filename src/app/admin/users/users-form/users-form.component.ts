import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../admin-layout/breadcrumb/breadcrumb.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-form',
  standalone: true,
  imports: [FormsModule, CommonModule, BreadcrumbComponent],
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent {
  public type_form: number = 1;
  public name_button = 'Guardar Registro';
  public route: string = '';
  public breadcumb: string = 'Usuarios-Agregar';

  public name: string = '';
  public surname: string = '';
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public FILE_AVATAR: any;
  public IMAGEN_PREVIZUALIZA: any = 'assets/images/user.jpg';
  public selectedValue!: string;

  public roles: any = [];
  public text_validation: string = '';
  public text_success: string = '';
  constructor(public usuarioService: UsersService) {}

  ngOnInit(): void {
    this.usuarioService.listConfig().subscribe((resp: any) => {
      console.log(resp);
      this.roles = resp.roles;
    });
  }

  save() {
    this.text_validation = '';
    if (
      !this.name ||
      !this.email ||
      !this.surname ||
      !this.FILE_AVATAR ||
      !this.password
    ) {
      this.text_validation =
        'LOS CAMPOS SON NECESARIOS (name,surname,email,avatar)';
      return;
    }

    if (this.password != this.password_confirmation) {
      this.text_validation = 'LAS CONTRASEÑA DEBEN SER IGUALES';
      return;
    }
    console.log(this.selectedValue);

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('email', this.email);

    formData.append('password', this.password);
    formData.append('role_id', this.selectedValue);
    formData.append('imagen', this.FILE_AVATAR);

    this.usuarioService.registerUser(formData).subscribe((resp: any) => {
      console.log(resp);

      if (resp.message == 403) {
        this.text_validation = resp.message_text;
      } else {
        this.text_success = 'El usuario ha sido registrado correctamente';

        this.name = '';
        this.surname = '';
        this.email = '';

        this.password = '';
        this.password_confirmation = '';
        this.selectedValue = '';
        this.FILE_AVATAR = null;
        this.IMAGEN_PREVIZUALIZA = null;
      }
    });
  }

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      // alert("SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN");
      this.text_validation = 'SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => (this.IMAGEN_PREVIZUALIZA = reader.result);
  }
}
