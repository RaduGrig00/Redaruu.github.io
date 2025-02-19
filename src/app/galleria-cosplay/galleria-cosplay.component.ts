import { Component, OnInit } from '@angular/core';
import { IgFotoService } from './../ig-foto.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

interface CharacterGallery {
  [key: string]: CharacterImage[];
}

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

interface CharacterSearch {
  name: string;
  value: string;
  searchCount: number;
}

interface CharacterImage {
  url: string;
  caption: string;
}

const CHARACTER_GALLERIES: CharacterGallery = {
  yennefer: [
    { url: 'assets/immagini/yennefer/1.jpg', caption: 'CAPTIONS.YENNEFER.1' },
    { url: 'assets/immagini/yennefer/2.jpg', caption: 'CAPTIONS.YENNEFER.2' },
    { url: 'assets/immagini/yennefer/3.jpg', caption: 'CAPTIONS.YENNEFER.3' },
    { url: 'assets/immagini/yennefer/4.jpg', caption: 'CAPTIONS.YENNEFER.4' },
    { url: 'assets/immagini/yennefer/5.jpg', caption: 'CAPTIONS.YENNEFER.5' },
    { url: 'assets/immagini/yennefer/6.jpg', caption: 'CAPTIONS.YENNEFER.6' },
    { url: 'assets/immagini/yennefer/7.jpg', caption: 'CAPTIONS.YENNEFER.7' },
    { url: 'assets/immagini/yennefer/8.jpg', caption: 'CAPTIONS.YENNEFER.8' },
    { url: 'assets/immagini/yennefer/9.jpg', caption: 'CAPTIONS.YENNEFER.9' },
    { url: 'assets/immagini/yennefer/10.jpg', caption: 'CAPTIONS.YENNEFER.10' },
  ],
  triss: [
    { url: 'assets/immagini/triss/1.jpg', caption: '' },
    { url: 'assets/immagini/triss/2.jpg', caption: '' },
    { url: 'assets/immagini/triss/3.jpg', caption: '' },
    { url: 'assets/immagini/triss/4.jpg', caption: '' },
    { url: 'assets/immagini/triss/5.jpg', caption: '' },
    { url: 'assets/immagini/triss/6.jpg', caption: '' },
    { url: 'assets/immagini/triss/7.jpg', caption: '' },
    { url: 'assets/immagini/triss/8.jpg', caption: '' },
    { url: 'assets/immagini/triss/9.jpg', caption: '' },
    { url: 'assets/immagini/triss/10.jpg', caption: '' },
  ],
  '2b': [
    { url: 'assets/immagini/2b/1.jpg', caption: '' },
    { url: 'assets/immagini/2b/2.jpg', caption: '' },
    { url: 'assets/immagini/2b/3.jpg', caption: '' },
    { url: 'assets/immagini/2b/4.jpg', caption: '' },
    { url: 'assets/immagini/2b/5.jpg', caption: '' },
    { url: 'assets/immagini/2b/6.jpg', caption: '' },
    { url: 'assets/immagini/2b/7.jpg', caption: '' },
    { url: 'assets/immagini/2b/8.jpg', caption: '' },
    { url: 'assets/immagini/2b/9.jpg', caption: '' },
    { url: 'assets/immagini/2b/10.jpg', caption: '' },
  ],
};

@Component({
  selector: 'app-galleria-cosplay',
  templateUrl: './galleria-cosplay.component.html',
  styleUrls: ['./galleria-cosplay.component.css'],
})
export class GalleriaCosplayComponent implements OnInit {
  photos: Photo[] = [];
  nextPageToken: string | null = null;

  selectedPg: string = '';
  pgPhotos: CharacterImage[] = [];
  currentImageIndex = 0;
  showPgGallery: boolean = false;

  characters: CharacterSearch[] = [
    { name: 'Yennefer di Vengerberg', value: 'yennefer', searchCount: 0 },
    { name: 'Triss Merigold', value: 'trisss', searchCount: 0 },
    { name: '2B', value: '2b', searchCount: 0 },
    { name: 'A2', value: 'a2', searchCount: 0 },
    { name: 'Emilia', value: 'emilia', searchCount: 0 },
    { name: 'Jinx', value: 'jinx', searchCount: 0 },
    { name: 'Yor', value: 'yor', searchCount: 0 },
    { name: 'Albedo', value: 'albedo', searchCount: 0 },
    { name: 'Ariel', value: 'ariel', searchCount: 0 },
    { name: 'Lucy', value: 'lucy', searchCount: 0 },
    { name: 'Hinata', value: 'hinata', searchCount: 0 },
    { name: 'Zero Two', value: 'zerotwo', searchCount: 0 },
    { name: 'Marin', value: 'marin', searchCount: 0 },
    { name: 'Rosalinda/Rosalina', value: 'rosalina', searchCount: 0 },
    { name: 'Rei', value: 'rei', searchCount: 0 },
    { name: 'Nezuko', value: 'nezuko', searchCount: 0 },
    { name: 'Daki', value: 'daki', searchCount: 0 },
    { name: 'Zelda', value: 'zelda', searchCount: 0 },
    { name: 'Sakura', value: 'sakura', searchCount: 0 },
    { name: 'Syleny', value: 'syleny', searchCount: 0 },
    { name: 'Meridiumriaele', value: 'meridiumriaele', searchCount: 0 },
    { name: 'Nnumeth', value: 'nnumeth', searchCount: 0 },
    { name: 'Nilou', value: 'nilou', searchCount: 0 },
    { name: 'Ciri', value: 'ciri', searchCount: 0 },
    { name: 'Ahri', value: 'ahri', searchCount: 0 },
    { name: 'Spider Demon Mother', value: 'sdm', searchCount: 0 },
    { name: 'Evelynn', value: 'evelynn', searchCount: 0 },
    { name: 'Yumeko', value: 'yumeko', searchCount: 0 },
    { name: 'Asuna', value: 'asuna', searchCount: 0 },
    { name: 'Rem', value: 'rem', searchCount: 0 },
    { name: 'Mitsuri', value: 'mitsuri', searchCount: 0 },
    { name: 'Kanae', value: 'kanae', searchCount: 0 },
    { name: 'Elizabeth', value: 'elizabeth', searchCount: 0 },
    { name: 'Touka', value: 'touka', searchCount: 0 },
    { name: 'Kakyoin', value: 'kakyoin', searchCount: 0 },
    { name: 'Itachi', value: 'itachi', searchCount: 0 },
  ];

  constructor(
    private igFotoService: IgFotoService,
    private cookieService: CookieService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadPhotos();
    this.loadSearchCounts();
  }

  loadSearchCounts(): void {
    this.characters = this.characters.map((char) => ({
      ...char,
      searchCount: parseInt(
        this.cookieService.get(`search_count_${char.value}`) || '0'
      ),
    }));
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
    this.pgPhotos = this.pgPhotos.filter((photo) => photo.url !== failedUrl);
    if (this.currentImageIndex >= this.pgPhotos.length) {
      this.currentImageIndex = Math.max(0, this.pgPhotos.length - 1);
    }
  }

  searchPg(): void {
    if (this.selectedPg) {
      const character = this.characters.find(
        (char) => char.value === this.selectedPg
      );
      if (!character) {
        console.error('Pg non trovato:', this.selectedPg);
        return;
      }

      character.searchCount++;
      this.cookieService.set(
        `search_count_${character.value}`,
        character.searchCount.toString(),
        {
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          path: '/',
        }
      );

      const galleryData = CHARACTER_GALLERIES[character.value];
      if (galleryData) {
        this.pgPhotos = galleryData.map((photo, index) => ({
          url: photo.url,
          caption: this.translateService.instant(
            `CAPTIONS.${character.value.toUpperCase()}.${index + 1}`
          )
        }));
      } else {
        const pgFolder = character.value.replace('#', '').toLowerCase();
        this.pgPhotos = Array.from({ length: 10 }, (_, i) => ({
          url: `assets/immagini/${pgFolder}/${i + 1}.jpg`,
          caption: this.translateService.instant(
            `CAPTIONS.${character.value.toUpperCase()}.${i + 1}`,
            { fallbackText: `${character.name} - Photo ${i + 1}` }
          )
        }));
      }
      this.currentImageIndex = 0; //resetta alla prima immagine
      this.showPgGallery = true;
    } else {
      this.pgPhotos = [];
      this.currentImageIndex = 0;
      this.showPgGallery = true;
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.pgPhotos.length - 1) {
      this.currentImageIndex++;
    }
  }
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  getMostSearchedCharacters(limit: number = 5): CharacterSearch[] {
    return [...this.characters]
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, limit);
  }
}
