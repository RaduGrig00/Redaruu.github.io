import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IgFotoService {
  private accessToken =
    'IGAAHvxZBSZBQy1BZAE16MFVJUENNeGNPU0NfeVVOOG01UlVJbmpURWdBdGI4QS1oUmVnUm1fOHJfV0EtLWwxYktsNXRQa1VBdVRKdU13UHhraFBxdFpCMEdWWUQ4aklaS1h4UFFSYWd0OXlSQlp4LTRIbmVGdG92TE5QWU9pcXZAwRQZDZD';
  private apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,children{media_type,media_url}&access_token=${this.accessToken}`;

  constructor(private http: HttpClient) {}

  getPhotos(after?: string): Observable<any> {
    let url = this.apiUrl;
    if (after) {
      url += `&after=${after}`;
    }
    return this.http.get<any>(url);
  }
}
