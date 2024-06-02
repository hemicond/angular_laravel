import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/auth/auth.service';
import { SideBarService } from '@shared/data/side-bar.service';
import { routes } from '@shared/routes/routes';

import { NavbarComponent } from '../../../common/navbar.component';
import { SidebarService } from '../../../common/services';
import { DarkThemeToggleComponent } from '../../../common/dark-theme-toggle.component';
@Component({
  selector: 'app-header',
  imports: [NavbarComponent, DarkThemeToggleComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public routes = routes;
  public openBox = false;
  public miniSidebar = false;
  public addClass = false;
  public user: any;

  constructor(readonly sidebarService: SidebarService) {}
}
