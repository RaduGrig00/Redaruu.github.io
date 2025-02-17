import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  currentLang$ = this.languageService.currentLang$;

  constructor(private languageService: LanguageService) {}

  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  switchLang(lang: string) {
    this.languageService.switchLanguage(lang);
  }

  getRoute(route: string): string {
    if (this.languageService.getCurrentLanguage() === 'en') {
      switch (route) {
        case 'about':
          return 'about';
        case 'galleria':
          return 'gallery';
        case 'contatti':
          return 'contactme';
        default:
          return route;
      }
    }
    return route;
  }
}
