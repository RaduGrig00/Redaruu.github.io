import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent {
    cookiesAccepted = false;

    constructor(private cookieService: CookieService) {
      this.cookiesAccepted = this.cookieService.get('cookies-accepted') === 'true';
    }

    acceptCookies() {
      this.cookieService.set('cookies-accepted', 'true');  //scade in 365 giorni
      this.cookiesAccepted = true;
    }

    declineCookies() {
      this.cookieService.set('cookies-accepted', 'false'); //scade in 365 giorni
      this.cookiesAccepted = true;
    }
}
