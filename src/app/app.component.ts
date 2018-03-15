import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MenuService } from 'app/components/menu/menu.service';
import { TranslateService } from '@ngx-translate/core';
import { TextsComponent } from 'app/components/texts/texts.component';
import { MatSidenav } from '@angular/material';
const ICO_MENU = "./assets/img/ic_menu_white_24px.svg";
const ICO_BACK = "./assets/img/ic_arrow_back_white_24px.svg";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MenuService]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public event : any;
  public altaText: boolean = false;

  private title: string;
  private back: boolean;
  private icon: string;



  constructor(private titleService: Title,
    private router: Router,
    private menuService: MenuService,
    private translate: TranslateService) {

    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let _title = this.getData(router.routerState, router.routerState.root, 'title').join('-');
        translate.get(_title).subscribe((res: string) => {
          this.title = res;
          titleService.setTitle(this.title);
        })
        let _back: any = this.getData(router.routerState, router.routerState.root, 'back');
        if (_back == 'true') {
          this.back = true;
          this.icon = ICO_BACK;
        } else {
          this.back = false;
          this.icon = ICO_MENU;
        }

      }
    });

  }

  private getData(state, parent, value) {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data[value]) {
      data.push(parent.snapshot.data[value]);
    }

    if (state && parent) {
      data.push(... this.getData(state, state.firstChild(parent), value));
    }
    return data;
  }

  ngAfterViewInit(): void {
    this.menuService.sidenav = this.sidenav;
  }

  public start(): void {
    if (this.back === true) {
      this.menuService.back();
    } else {
      this.menuService.start();
    }
  }

  public changeLan(lan: string): void {
    this.translate.use(lan);
  }

  public add(): void {
    this.event.add();
  }

  public onRouterOutletActivate(event: any) {
    if (event instanceof TextsComponent) {
      this.altaText = true;
    } else {
      this.altaText = false;
    }
    this.event = event;
  }

}
