import { Component } from '@angular/core';
import { LanguageService } from '../language.service';

interface PhotoChild {
  media_type: string;
  media_url: string;
  id: string;
}

interface Photo {
  id: string;
  caption?: string;
  media_url: string;
  media_type: string;
  children?: {
    data: PhotoChild[];
  };
}

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.css'],
})
export class GalleriaComponent {
  /*photos: Photo[] = [];
  selectedKeyword: string = '';
  nextPageToken: string | null = null;*/

  currentLang$ = this.languageService.currentLang$;
  
  constructor(private languageService: LanguageService) {}

  getGalleryPath(type: string): string[]{
    const isEnglish = this.languageService.getCurrentLanguage() === 'en';
    const basePath = isEnglish ? 'gallery' : 'galleria';
    const subPath = isEnglish ? `${type}-gallery` : `galleria-${type}`
    return ['/', this.languageService.getCurrentLanguage(), basePath, subPath];
  }


  /*onKeywordChange(event: any): void {
    this.selectedKeyword = event.target.value;
    this.photos = [];
    this.nextPageToken = null;
    this.fetchPhotos();
  }

  getDisplayUrl(photo: Photo): string{
    //per i caroselli con almeno due immagini, restituisce l'url della seconda
    if (photo.media_type === 'CAROUSEL_ALBUM' && photo.children && photo.children.data && photo.children.data.length >= 2){
      return photo.children.data[1].media_url;
    }
    //per le singole immagini, restituisce l'url della stessa
    return photo.media_url;
  }

  fetchPhotos(): void {
    console.log('Fetching photos with nextPageToken:', this.nextPageToken);
    this.IgFotoService.getPhotos(this.nextPageToken ?? undefined).subscribe(
      (data: { data: Photo[]; paging: { next: string } }) => {
        console.log('API response:', data);
        const filteredPhotos = data.data.filter((photo: Photo) => {
          console.log('Photo:', photo);
          console.log('Photo object structure:', JSON.stringify(photo, null, 2));
          // controlla che sia un'immagine singola
          const isSingleImage = photo.media_type === 'IMAGE';
          // controlla che sia un carosello con 2 o meno immagini
          const isCarousel = photo.media_type === 'CAROUSEL_ALBUM';
          const isCarouselCorrectLength = photo.children?.data && Array.isArray(photo.children.data) && photo.children.data.length <= 2;
          const isValidCarousel = isCarousel && isCarouselCorrectLength;

          const hasCaption = photo.caption?.toLowerCase().includes(this.selectedKeyword.toLowerCase());

          console.log('Media Type:', photo.media_type);
          console.log('Is Single Image:', isSingleImage);
          console.log('Is Valid Carousel:', isValidCarousel);
          console.log('Children Length:', photo.children?.data.length);
          //return solo la singola immagine o il carosello valido
          return hasCaption && (isSingleImage || isValidCarousel);
        });
        console.log('Filtered photos:', filteredPhotos);
        this.photos = [...this.photos, ...filteredPhotos];
        this.nextPageToken = data.paging?.next
          ? new URL(data.paging.next).searchParams.get('after')
          : null;
        console.log('Updated nextPageToken:', this.nextPageToken);

        //Fetcha recursivamente la prossima pagina se ce n'è una
        if (this.nextPageToken) {
          this.fetchPhotos();
        }
      },
      (error) => {
        console.error('Error fetching photos:', error);
      }
    );
  }*/

}
