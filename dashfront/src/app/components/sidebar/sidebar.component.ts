import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/actualite', title: 'Evenements',  icon:'person', class: '' },
    { path: '/table-list', title: 'Infos Evenements',  icon:' bubble_chart', class: '' },
    { path: '/ticket', title: 'Tickets',  icon:'content_paste', class: '' },
    { path: '/icons', title: 'Reservations',  icon:'library_books ', class: '' },
    { path: '/calendar', title: 'Calendrier Evenement',   icon:' bubble_chart', class: '' },
    { path: '/upgrade', title: 'SITEWEB',  icon:'unarchive', class: 'active-pro' },
    { path: '/file', title: 'file',  icon: 'dashboard', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
