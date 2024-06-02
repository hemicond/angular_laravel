/* import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DarkThemeToggleComponent } from '../../common/dark-theme-toggle.component';
import { NavbarComponent } from '../../common/navbar.component';
import { SidebarComponent } from '../../common/sidebar.component';
import { SidebarItemGroupComponent } from '../../common/sidebar-item-group.component';
import { SidebarItemComponent } from '../../common/sidebar-item.component';
import { SidebarService } from '../../common/services';
import { components } from '../../common/components';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    DarkThemeToggleComponent,
    NavbarComponent,
    SidebarComponent,
    SidebarItemGroupComponent,
    SidebarItemComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  components = components;
  constructor(readonly sidebarService: SidebarService) {}
}
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { SideBarService as SideServ } from '@shared/data/side-bar.service';
import { DataService } from '@shared/data/data.service';
import { MenuItem, SideBarData } from '@shared/models/models';
import { AuthService } from '@shared/auth/auth.service';

import { SidebarComponent as SideCompo } from './sidebar/sidebar.component';
import { routes } from '@shared/routes/routes';
import { NavbarComponent } from '../../common/navbar.component';
import { SidebarComponent } from '../../common/sidebar.component';
import { SidebarItemGroupComponent } from '../../common/sidebar-item-group.component';
import { SidebarItemComponent } from '../../common/sidebar-item.component';
import { HeaderComponent } from './header/header.component';
import { initFlowbite } from 'flowbite';

interface Route {
  url: string;
}
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SideCompo,
    RouterModule,
    NavbarComponent,
    SidebarComponent,
    SidebarItemGroupComponent,
    SidebarItemComponent,
    HeaderComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  public miniSidebar = 'false';
  public expandMenu = 'false';
  public mobileSidebar = 'false';
  public sideBarActivePath = false;
  public headerActivePath = false;
  base = '';
  page = '';
  currentUrl = '';
  public classAdd = false;

  public multilevel: Array<boolean> = [false, false, false];

  public routes = routes;
  public sidebarData: Array<SideBarData> = [];
  public user: any;
  /* components = components; */
  constructor(
    private data: DataService,
    private router: Router,
    private sideBar: SideServ,
    public authService: AuthService
  ) {
    // this.user = this.authService.user;
    let USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    // INICIO
    if (this.user && this.user.roles.includes('Super-Admin')) {
      this.sidebarData = this.data.sideBar;
    } else {
      // VAMOS A FILTRAR Y VALIDAR QUE OPCIONES PUEDE VER ESE ROL
      let permissions = this.user.permissions;

      let SIDE_BAR_G: any = [];
      this.data.sideBar.forEach((side: any) => {
        let SIDE_B: any = [];
        side.menu.forEach((menu_s: any) => {
          if (menu_s.subMenus.length > 0) {
            let SUB_MENUS = menu_s.subMenus.filter(
              (submenu: any) =>
                permissions.includes(submenu.permision) && submenu.show_nav
            );
            if (SUB_MENUS.length > 0) {
              menu_s.subMenus = SUB_MENUS;
              SIDE_B.push(menu_s);
            }
          } else {
            if (permissions.includes(menu_s.permision)) {
              menu_s.subMenus = [];
              SIDE_B.push(menu_s);
            }
          }
        });
        if (SIDE_B.length > 0) {
          side.menu = SIDE_B;
          SIDE_BAR_G.push(side);
        }
      });
      this.sidebarData = SIDE_BAR_G;
    }

    // FIN
    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);

    /* this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = 'true';
      } else {
        this.miniSidebar = 'false';
      }
    });

    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = 'true';
      } else {
        this.mobileSidebar = 'false';
      }
    });

    this.sideBar.expandSideBar.subscribe((res: string) => {
      this.expandMenu = res;
      if (res == 'false' && this.miniSidebar == 'true') {
        this.data.sideBar.map((mainMenus: SideBarData) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      if (res == 'true' && this.miniSidebar == 'true') {
        this.data.sideBar.map((mainMenus: SideBarData) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    this.getRoutes(this.router); */
  }

  /*  public toggleMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  private getRoutes(route: Route): void {
    if (route.url.split('/')[2] === 'confirm-mail') {
      this.sideBarActivePath = false;
      this.headerActivePath = false;
    } else {
      this.sideBarActivePath = true;
      this.headerActivePath = true;
    }
  } */

  ngOnInit() {
    initFlowbite();
  }

  public expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.sidebarData.map((mainMenus: SideBarData) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }
  private getRoutes(route: { url: string }): void {
    const bodyTag = document.body;

    bodyTag.classList.remove('slide-nav');
    bodyTag.classList.remove('opened');
    this.currentUrl = route.url;

    const splitVal = route.url.split('/');

    this.base = splitVal[1];
    this.page = splitVal[2];
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next('true');
    } else {
      this.sideBar.expandSideBar.next('false');
    }
  }
}
