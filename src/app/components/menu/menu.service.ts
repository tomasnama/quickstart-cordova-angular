import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class MenuService {

  public sidenav: MatSidenav;

  public start():void {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

}