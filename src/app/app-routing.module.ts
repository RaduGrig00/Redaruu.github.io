import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { ContattiComponent } from './contatti/contatti.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'about', component: AboutComponent},
  { path: 'galleria', component: GalleriaComponent},
  { path: 'contatti', component: ContattiComponent},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
