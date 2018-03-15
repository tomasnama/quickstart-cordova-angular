import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class MenuService {

  public sidenav: MatSidenav;
  private previousUrl : string = undefined;
  private currentUrl : string = undefined;

  constructor(private router : Router,
              private location: Location,) {

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
    
  }

  public start():void {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

  public back(): void {
    this.location.back();
  }

}