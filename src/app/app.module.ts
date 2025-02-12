import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    CookieBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
