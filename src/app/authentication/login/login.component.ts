import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
import { routes } from '@shared/routes/routes';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  public ERROR = false;

  _form = this.builder.group({
    email: this.builder.control('tester@example.com', Validators.required),
    password: this.builder.control('123123123', Validators.required),
  });

  get f() {
    return this._form.controls;
  }
  constructor(
    private builder: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      // localStorage.removeItem('authenticated');
      this.router.navigate([routes.adminDashboard]);
    }
  }

  loginFormSubmit() {
    if (this._form.valid) {
      this.ERROR = false;
      this.auth
        .login(
          this._form.value.email ? this._form.value.email : '',
          this._form.value.password ? this._form.value.password : ''
        )
        .subscribe(
          (resp: any) => {
            alert(resp);
            if (resp) {
              // EL LOGIN ES EXITOSO
              setTimeout(() => {
                document.location.reload();
              }, 50);
            } else {
              // EL LOGIN NO ES EXITOSO
              this.ERROR = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  /*  togglePassword() {
    this.passwordClass = !this.passwordClass;
  } */
}
