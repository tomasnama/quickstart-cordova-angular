import { Routes } from "@angular/router";
import { Page1Component } from "app/components/page1/page1.component";
import { AboutComponent } from "app/components/about/about.component";
import { Page2Component } from "app/components/page2/page2.component";


export const appRoutes: Routes = [
  {
    path: 'page1',
    component: Page1Component,
    data: {
      title: 'PAGE1.TITLE',
      back: false,
    }
  },
  {
    path: 'page2',
    component: Page2Component,
    data: {
      title: 'PAGE2.TITLE',
      back: false,
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'ABOUT.TITLE',
      back: true,
    }
  },
  {
    path: '',
    redirectTo: 'page1',
    pathMatch: 'full'
  },
  {
    path: '**', component: Page1Component,
  }
];