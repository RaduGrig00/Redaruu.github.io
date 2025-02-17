import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
import { GalleriaComponent } from './galleria/galleria.component';
import { GalleriaCosplayComponent } from './galleria-cosplay/galleria-cosplay.component';
import { GalleriaGlamourComponent } from './galleria-glamour/galleria-glamour.component';
import { ContattiComponent } from './contatti/contatti.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: ':lang', 
    children: [
  { path: '', component: LandingComponent},
  { path: 'about', component: AboutComponent},
  { path: 'galleria',
    children: [
      { path: '', component: GalleriaComponent },
      { path: 'galleria-cosplay', component: GalleriaCosplayComponent},
      { path: 'galleria-glamour', component: GalleriaGlamourComponent},
    ]
  },
  { path: 'gallery',
    children: [
      { path: '', component: GalleriaComponent },
      { path: 'cosplay-gallery', component: GalleriaCosplayComponent},
      { path: 'glamour-gallery', component: GalleriaGlamourComponent},
    ]
  },
  { path: 'contatti', component: ContattiComponent},
  { path: 'contactme', component: ContattiComponent},
  
  ]
},
  { path: '', redirectTo:'it', pathMatch:'full' },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
