import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContattiComponent } from './contatti/contatti.component';
import { FooterComponent } from './footer/footer.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { GalleriaCosplayComponent } from './galleria-cosplay/galleria-cosplay.component';
import { GalleriaGlamourComponent } from './galleria-glamour/galleria-glamour.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavComponent,
    AboutComponent,
    GalleriaComponent,
    NotFoundComponent,
    ContattiComponent,
    FooterComponent,
    CookieBannerComponent,
    GalleriaCosplayComponent,
    GalleriaGlamourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'it',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
