import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
//import { Location } from '@angular/common';

@Injectable()
export class MenuService {

  public sidenav: MatSidenav;
  private history: string[] = [];
  private previousUrl : string = undefined;
  private currentUrl : string = undefined;
  private isBack : boolean = false;

  constructor(private router : Router,
              /*private location: Location*/) {

    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        if (this.isBack) {
          this.isBack = false;
        } else {
          this.history.push(this.previousUrl);
        }
        debugger;
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
    debugger;
    this.isBack = true;
    let _back = this.history[this.history.length-1];
    this.history.splice(this.history.length-1, 1);
    debugger;
    this.router.navigate([_back], {skipLocationChange:true});
  }

}