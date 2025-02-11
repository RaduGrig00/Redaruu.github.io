import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContattiComponent } from './contatti/contatti.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavComponent,
    AboutComponent,
    GalleriaComponent,
    NotFoundComponent,
    ContattiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
