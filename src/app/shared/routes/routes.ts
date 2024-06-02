export class routes {
  private static Url = '';

  public static get baseUrl(): string {
    return this.Url;
  }

  public static get login(): string {
    return this.baseUrl + '/login';
  }
  public static get register(): string {
    return this.baseUrl + '/register';
  }
  public static get adminDashboard(): string {
    return this.baseUrl + '/admin/';
  }
  public static get usuarios(): string {
    return this.baseUrl + '/admin/users';
  }
  public static get roles(): string {
    return this.baseUrl + '/admin/roles';
  }
  public static get productos(): string {
    return this.baseUrl + '/admin/products';
  }

  public static get error404(): string {
    return this.baseUrl + '/error/error404';
  }
  public static get error500(): string {
    return this.baseUrl + '/error/error500';
  }

  public static get registerRole(): string {
    return this.baseUrl + '/roles/register';
  }
}
