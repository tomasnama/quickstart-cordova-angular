import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MdToolbarModule, MdSidenavModule, MdButtonModule, MdListModule, MdCardModule, MdMenuModule, MdGridListModule, MdInputModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { appRoutes } from 'app/app.routes';
import { MenuService } from 'app/components/menu/menu.service';
import { TextsComponent } from './components/texts/texts.component';
import { TextDetailComponent } from './components/texts/text-detail/text-detail.component';
import { FormsModule } from '@angular/forms';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    Page1Component,
    Page2Component,
    AboutComponent,
    MenuComponent,
    TextsComponent,
    TextDetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    NoopAnimationsModule,
    MdToolbarModule,
    MdSidenavModule,
    MdButtonModule,
    MdListModule,
    MdCardModule,
    MdMenuModule,
    MdGridListModule,
    FormsModule,
    MdInputModule
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
