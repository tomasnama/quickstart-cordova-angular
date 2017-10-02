import { Component, OnInit } from '@angular/core';
import { MenuService } from 'app/components/menu/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: []
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private menuService: MenuService) { }

  ngOnInit() {
  }

  goPage1():void {
    this.router.navigate(['/page1']);
    this.menuService.sidenav.close();
  }

  goPage2():void {
    this.router.navigate(['/page2']);
    this.menuService.sidenav.close();
  }

  goAbout():void {
    this.router.navigate(['/about']);
    this.menuService.sidenav.close();
  }
}
