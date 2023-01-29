import { Component } from '@angular/core';
import { iMenu } from '../../interfaces/menu.interface';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  linksMenu: iMenu[];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu() {
    this.linksMenu = this.menuService.getMenu();
  }
}
