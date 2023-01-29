import { Injectable } from '@angular/core';
import { iMenu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  linksMenu: iMenu[] = [
    { path: 'products', label: 'Products', active: 'text-yellow-500' },
    { path: 'about', label: 'About Us', active: 'text-yellow-500' }
  ];

  constructor() { }

  getMenu(): iMenu[] {
    return this.linksMenu;
  }
}
