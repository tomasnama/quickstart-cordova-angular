import { Injectable } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Injectable()
export class MenuService {

  public sidenav: MdSidenav;

  public start():void {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

}