import { Component, OnInit } from '@angular/core';
import { IgFotoService } from './../ig-foto.service';

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
  permalink: string;
  children?: {
    data: PhotoChild[];
  };
}

@Component({
  selector: 'app-galleria-glamour',
  templateUrl: './galleria-glamour.component.html',
  styleUrls: ['./galleria-glamour.component.css'],
})
export class GalleriaGlamourComponent implements OnInit {
  photos: Photo[] = [];
  nextPageToken: string | null = null;

  glamPhotos: string[] = [];
  currentImageIndex = 0;
  showGlamGallery: boolean = false;

  constructor(private igFotoService: IgFotoService) {}

  ngOnInit(): void {
    this.loadPhotos();
  }

  getPostUrl(photo: Photo): string {
    if (!photo || !photo.permalink) return '';

    // Aggiungi img_index=2 per i post carosello con almeno due immagini, purtroppo non funziona perchè non è supportato da Instagram
    /*if (photo.media_type === 'CAROUSEL_ALBUM' && 
      photo.children?.data && 
      photo.children.data.length >= 2) {
    return `${photo.permalink}?img_index=2`;
}*/
    return photo.permalink;
  }

  getDisplayUrl(photo: Photo): string {
    //per i caroselli con almeno due immagini, restituisce l'url della seconda
    if (
      photo.media_type === 'CAROUSEL_ALBUM' &&
      photo.children &&
      photo.children.data &&
      photo.children.data.length >= 2
    ) {
      return photo.children.data[1].media_url;
    }
    //per le singole immagini, restituisce l'url della stessa
    return photo.media_url;
  }

  loadPhotos(): void {
    this.igFotoService.getPhotos(this.nextPageToken ?? undefined).subscribe(
      (data: { data: Photo[]; paging: { next: string } }) => {
        const filteredPhotos = data.data.filter((photo: Photo) => {
          // controlla che sia un'immagine singola
          const isSingleImage = photo.media_type === 'IMAGE';
          // controlla che sia un carosello con 2 o meno immagini
          const isCarousel = photo.media_type === 'CAROUSEL_ALBUM';
          const isCarouselCorrectLength =
            photo.children?.data &&
            Array.isArray(photo.children.data) &&
            photo.children.data.length <= 2;
          const isValidCarousel = isCarousel && isCarouselCorrectLength;

          const caption = photo.caption;
          //return solo la singola immagine o il carosello valido
          return caption && (isSingleImage || isValidCarousel);
        });

        this.photos = filteredPhotos;
        /*this.photos = [...this.photos, ...filteredPhotos];
            this.nextPageToken = data.paging?.next
              ? new URL(data.paging.next).searchParams.get('after')
              : null;
            console.log('Updated nextPageToken:', this.nextPageToken);*/

        //Fetcha recursivamente la prossima pagina se ce n'è una, commento perchè alla fine non serve ma può essere utile
        /*if (this.nextPageToken) {
              this.loadPhotos();
            }*/
      },
      (error) => {
        console.error('Error fetching photos:', error);
      }
    );
  }

  handleImageError(event: any): void {
    console.error('Image failed to load:', event.target.src);
    const failedUrl = event.target.src;
    this.glamPhotos = this.glamPhotos.filter((url) => url !== failedUrl);
    if (this.currentImageIndex >= this.glamPhotos.length) {
      this.currentImageIndex = Math.max(0, this.glamPhotos.length - 1);
    }
  }

  searchPg(): void {
      const glamFolder = 'glamour';
      this.glamPhotos = [
        `assets/immagini/${glamFolder}/1.jpg`,
        `assets/immagini/${glamFolder}/2.jpg`,
        `assets/immagini/${glamFolder}/3.jpg`,
        `assets/immagini/${glamFolder}/4.jpg`,
      ];
      this.currentImageIndex = 0; //resetta alla prima immagine
    
    this.showGlamGallery = true;
  }

  nextImage(): void {
    if (this.currentImageIndex < this.glamPhotos.length - 1) {
      this.currentImageIndex++;
    }
  }
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}
