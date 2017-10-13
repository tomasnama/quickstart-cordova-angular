import { Routes } from "@angular/router";
import { Page1Component } from "app/components/page1/page1.component";
import { AboutComponent } from "app/components/about/about.component";
import { Page2Component } from "app/components/page2/page2.component";
import { TextsComponent } from "app/components/texts/texts.component";
import { TextDetailComponent } from "app/components/texts/text-detail/text-detail.component";
import { LocationComponent } from "app/components/location/location.component";
import { QrComponent } from "app/components/qr/qr.component";


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
    path: 'texts',
    component: TextsComponent,
    data: {
      title: 'TEXT.TITLE',
      back: true,
    }
  },
  {
    path: 'detail/:id/:text/:mode',
    component: TextDetailComponent,
    data: {
      title: 'DETAIL.TITLE',
      back: true,
    }
  },
  {
    path: 'location',
    component: LocationComponent,
    data: {
      title: 'LOCATION.TITLE',
      back: true,
    }
  },
  {
    path: 'qr',
    component: QrComponent,
    data: {
      title: 'QR.TITLE',
      back: true,
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