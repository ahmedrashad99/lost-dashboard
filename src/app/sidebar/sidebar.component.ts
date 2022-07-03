import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../Services/alertify.service';
import { AuthService } from '../Services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/users', title: 'Users',  icon:'ni-single-02 text-blue', class: '' },
    { path: '/storeOwners', title: 'Store Owners',  icon:'ni-shop text-orange', class: '' },
    { path: '/reports', title: 'Reports',  icon:'ni-bullet-list-67 text-yellow', class: '' },
    { path: '/reviews', title: 'Reviews',  icon:'ni-tag text-red', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService, private alertify: AlertifyService) { }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out!');
    this.router.navigate(['/login']);
  }

  validLogin() {
    if(this.authService.loggedIn() && !this.authService.expiredToken())
    {
      return true;
    }
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
