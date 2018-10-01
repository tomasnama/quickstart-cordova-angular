import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule, MatSidenavModule, MatButtonModule, MatListModule, MatCardModule, MatMenuModule, MatGridListModule, MatInputModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { AboutComponent } from './components/about/about.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuService } from './components/menu/menu.service';
import { TextsComponent } from './components/texts/texts.component';
import { TextDetailComponent } from './components/texts/text-detail/text-detail.component';
import { ExitappdialogComponent } from './components/dialogs/exitappdialog/exitappdialog.component';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './components/location/location.component';
import { QrComponent } from './components/qr/qr.component';
import { CdkTableModule } from '@angular/cdk/table';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwipeComponent } from './components/swipe/swipe.component';



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
    TextDetailComponent,
    LocationComponent,
    QrComponent,
    ExitappdialogComponent,
    SwipeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTabsModule,
    CdkTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [MenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
