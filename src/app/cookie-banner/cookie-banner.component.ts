import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit{
    
    cookiesAccepted = false;
    showBanner = true;

    constructor(private cookieService: CookieService) {}

    ngOnInit(){
      const cookieValue = this.cookieService.get('cookies-accepted');
      if (cookieValue) {
        this.cookiesAccepted = cookieValue === 'true';
        this.showBanner = false;
      }
    }

    acceptCookies() {
      this.cookieService.set('cookies-accepted', 'true', {
        expires: new Date(new Date().setFullYear(new Date().getFullYear()+1)),//scade in 365 giorni
        path: '/',
        secure: true,
        sameSite: 'Strict'
      }); 
      this.cookiesAccepted = true;
      this.showBanner = false;
    }

    declineCookies() {
      this.cookieService.set('cookies-accepted', 'false', {
        expires: new Date(new Date().setFullYear(new Date().getFullYear()+1)),//scade in 365 giorni
        path: '/',
        secure: true,
        sameSite: 'Strict'
      }); 
      this.cookiesAccepted = false;
      this.showBanner = false;
    }
}
