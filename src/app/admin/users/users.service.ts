import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@shared/auth/auth.service';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient, public authService: AuthService) {}

  listUsers() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios';
    return this.http.get(URL, { headers: headers });
  }

  listConfig() {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios/config';
    return this.http.get(URL, { headers: headers });
  }

  registerUser(data: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios';
    return this.http.post(URL, data, { headers: headers });
  }

  showUser(usuario_id: string) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios/' + usuario_id;
    return this.http.get(URL, { headers: headers });
  }

  updateUser(usuario_id: string, data: any) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios/' + usuario_id;
    return this.http.post(URL, data, { headers: headers });
  }

  deleteUser(usuario_id: string) {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.token,
    });
    let URL = URL_SERVICIOS + '/usuarios/' + usuario_id;
    return this.http.delete(URL, { headers: headers });
  }
}
