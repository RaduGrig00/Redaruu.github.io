import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguage = new BehaviorSubject<string>('it'); //crea un subject che contiene la lingua corrente
  currentLang$ = this.currentLanguage.asObservable(); //crea un observable a cui i componenti possono iscriversi per ricevere aggiornamenti sulla lingua corrente

  constructor(
    private router: Router,
    private location: Location,
    private translate: TranslateService
  ) {}

  switchLanguage(lang: string) {
    const currentUrl = this.location.path();
    const urlSegments = currentUrl.split('/');
    urlSegments[1] = lang;
    this.router.navigate(urlSegments); //mi porta alla pagina corrente con la lingua cambiata
    this.translate.use(lang); //aggiorna il servizio di traduzione alla lingua corrente
    this.currentLanguage.next(lang); //aggiorna il subject con la nuova lingua
    localStorage.setItem('lang', lang); //salva la lingua corrente nel local storage
  }

  getCurrentLanguage(): string {
    const path = this.location.path();
    return path.split('/')[1] || 'it';
  }

  initializeLanguage() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && ['it', 'en'].includes(savedLang)) {
      this.switchLanguage(savedLang);
    }
  }
}
