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
    { url: 'assets/immagini/triss/1.jpg', caption: 'CAPTIONS.TRISS.1' },
    { url: 'assets/immagini/triss/2.jpg', caption: 'CAPTIONS.TRISS.2' },
    { url: 'assets/immagini/triss/3.jpg', caption: 'CAPTIONS.TRISS.3' },
    { url: 'assets/immagini/triss/4.jpg', caption: 'CAPTIONS.TRISS.4' },
    { url: 'assets/immagini/triss/5.jpg', caption: 'CAPTIONS.TRISS.5' },
    { url: 'assets/immagini/triss/6.jpg', caption: 'CAPTIONS.TRISS.6' },
    { url: 'assets/immagini/triss/7.jpg', caption: 'CAPTIONS.TRISS.7' },
    { url: 'assets/immagini/triss/8.jpg', caption: 'CAPTIONS.TRISS.8' },
    { url: 'assets/immagini/triss/9.jpg', caption: 'CAPTIONS.TRISS.9' },
    { url: 'assets/immagini/triss/10.jpg', caption: 'CAPTIONS.TRISS.10' },
  ],
  '2b': [
    { url: 'assets/immagini/2b/1.jpg', caption: 'CAPTIONS.2B.1' },
    { url: 'assets/immagini/2b/2.jpg', caption: 'CAPTIONS.2B.2' },
    { url: 'assets/immagini/2b/3.jpg', caption: 'CAPTIONS.2B.3' },
    { url: 'assets/immagini/2b/4.jpg', caption: 'CAPTIONS.2B.4' },
    { url: 'assets/immagini/2b/5.jpg', caption: 'CAPTIONS.2B.5' },
    { url: 'assets/immagini/2b/6.jpg', caption: 'CAPTIONS.2B.6' },
    { url: 'assets/immagini/2b/7.jpg', caption: 'CAPTIONS.2B.7' },
    { url: 'assets/immagini/2b/8.jpg', caption: 'CAPTIONS.2B.8' },
    { url: 'assets/immagini/2b/9.jpg', caption: 'CAPTIONS.2B.9' },
    { url: 'assets/immagini/2b/10.jpg', caption: 'CAPTIONS.2B.10' },
  ],
  'a2': [
    { url: 'assets/immagini/a2/1.jpg', caption: 'CAPTIONS.A2.1' },
    { url: 'assets/immagini/a2/2.jpg', caption: 'CAPTIONS.A2.2' },
    { url: 'assets/immagini/a2/3.jpg', caption: 'CAPTIONS.A2.3' },
    { url: 'assets/immagini/a2/4.jpg', caption: 'CAPTIONS.A2.4' },
    { url: 'assets/immagini/a2/5.jpg', caption: 'CAPTIONS.A2.5' },
    { url: 'assets/immagini/a2/6.jpg', caption: 'CAPTIONS.A2.6' },
    { url: 'assets/immagini/a2/7.jpg', caption: 'CAPTIONS.A2.7' },
    { url: 'assets/immagini/a2/8.jpg', caption: 'CAPTIONS.A2.8' },
    { url: 'assets/immagini/a2/9.jpg', caption: 'CAPTIONS.A2.9' },
    { url: 'assets/immagini/a2/10.jpg', caption: 'CAPTIONS.A2.10' },
  ],
  emilia: [
    { url: 'assets/immagini/emilia/1.jpg', caption: 'CAPTIONS.EMILIA.1' },
    { url: 'assets/immagini/emilia/2.jpg', caption: 'CAPTIONS.EMILIA.2' },
    { url: 'assets/immagini/emilia/3.jpg', caption: 'CAPTIONS.EMILIA.3' },
    { url: 'assets/immagini/emiliajinx/4.jpg', caption: 'CAPTIONS.EMILIA.4' },
    { url: 'assets/immagini/emilia/5.jpg', caption: 'CAPTIONS.EMILIA.5' },
    { url: 'assets/immagini/emilia/6.jpg', caption: 'CAPTIONS.EMILIA.6' },
    { url: 'assets/immagini/emilia/7.jpg', caption: 'CAPTIONS.EMILIA.7' },
    { url: 'assets/immagini/emilia/8.jpg', caption: 'CAPTIONS.EMILIA.8' },
    { url: 'assets/immagini/emilia/9.jpg', caption: 'CAPTIONS.EMILIA.9' },
    { url: 'assets/immagini/emilia/10.jpg', caption: 'CAPTIONS.EMILIA.10' },
  ],
  jinx: [
    { url: 'assets/immagini/jinx/1.jpg', caption: 'CAPTIONS.JINX.1' },
    { url: 'assets/immagini/jinx/2.jpg', caption: 'CAPTIONS.JINX.2' },
    { url: 'assets/immagini/jinx/3.jpg', caption: 'CAPTIONS.JINX.3' },
    { url: 'assets/immagini/jinx/4.jpg', caption: 'CAPTIONS.JINX.4' },
    { url: 'assets/immagini/jinx/5.jpg', caption: 'CAPTIONS.JINX.5' },
    { url: 'assets/immagini/jinx/6.jpg', caption: 'CAPTIONS.JINX.6' },
    { url: 'assets/immagini/jinx/7.jpg', caption: 'CAPTIONS.JINX.7' },
    { url: 'assets/immagini/jinx/8.jpg', caption: 'CAPTIONS.JINX.8' },
    { url: 'assets/immagini/jinx/9.jpg', caption: 'CAPTIONS.JINX.9' },
    { url: 'assets/immagini/jinx/10.jpg', caption: 'CAPTIONS.JINX.10' },
  ],
  yor: [
    { url: 'assets/immagini/yor/1.jpg', caption: 'CAPTIONS.YOR.1' },
    { url: 'assets/immagini/yor/2.jpg', caption: 'CAPTIONS.YOR.2' },
    { url: 'assets/immagini/yor/3.jpg', caption: 'CAPTIONS.YOR.3' },
    { url: 'assets/immagini/yor/4.jpg', caption: 'CAPTIONS.YOR.4' },
    { url: 'assets/immagini/yor/5.jpg', caption: 'CAPTIONS.YOR.5' },
    { url: 'assets/immagini/yor/6.jpg', caption: 'CAPTIONS.YOR.6' },
    { url: 'assets/immagini/yor/7.jpg', caption: 'CAPTIONS.YOR.7' },
    { url: 'assets/immagini/yor/8.jpg', caption: 'CAPTIONS.YOR.8' },
    { url: 'assets/immagini/yor/9.jpg', caption: 'CAPTIONS.YOR.9' },
    { url: 'assets/immagini/yor/10.jpg', caption: 'CAPTIONS.YOR.10' },
  ],
  albedo: [
    { url: 'assets/immagini/albedo/1.jpg', caption: 'CAPTIONS.ALBEDO.1' },
    { url: 'assets/immagini/albedo/2.jpg', caption: 'CAPTIONS.ALBEDO.2' },
    { url: 'assets/immagini/albedo/3.jpg', caption: 'CAPTIONS.ALBEDO.3' },
    { url: 'assets/immagini/albedo/4.jpg', caption: 'CAPTIONS.ALBEDO.4' },
    { url: 'assets/immagini/albedo/5.jpg', caption: 'CAPTIONS.ALBEDO.5' },
    { url: 'assets/immagini/albedo/6.jpg', caption: 'CAPTIONS.ALBEDO.6' },
    { url: 'assets/immagini/albedo/7.jpg', caption: 'CAPTIONS.ALBEDO.7' },
    { url: 'assets/immagini/albedo/8.jpg', caption: 'CAPTIONS.ALBEDO.8' },
    { url: 'assets/immagini/albedo/9.jpg', caption: 'CAPTIONS.ALBEDO.9' },
    { url: 'assets/immagini/albedo/10.jpg', caption: 'CAPTIONS.ALBEDO.10' },
  ],
  ariel: [
    { url: 'assets/immagini/ariel/1.jpg', caption: 'CAPTIONS.ARIEL.1' },
    { url: 'assets/immagini/ariel/2.jpg', caption: 'CAPTIONS.ARIEL.2' },
    { url: 'assets/immagini/ariel/3.jpg', caption: 'CAPTIONS.ARIEL.3' },
    { url: 'assets/immagini/ariel/4.jpg', caption: 'CAPTIONS.ARIEL.4' },
    { url: 'assets/immagini/ariel/5.jpg', caption: 'CAPTIONS.ARIEL.5' },
    { url: 'assets/immagini/ariel/6.jpg', caption: 'CAPTIONS.ARIEL.6' },
    { url: 'assets/immagini/ariel/7.jpg', caption: 'CAPTIONS.ARIEL.7' },
    { url: 'assets/immagini/ariel/8.jpg', caption: 'CAPTIONS.ARIEL.8' },
    { url: 'assets/immagini/ariel/9.jpg', caption: 'CAPTIONS.ARIEL.9' },
    { url: 'assets/immagini/ariel/10.jpg', caption: 'CAPTIONS.ARIEL.10' },
  ],
  lucy: [
    { url: 'assets/immagini/lucy/1.jpg', caption: 'CAPTIONS.LUCY.1' },
    { url: 'assets/immagini/lucy/2.jpg', caption: 'CAPTIONS.LUCY.2' },
    { url: 'assets/immagini/lucy/3.jpg', caption: 'CAPTIONS.LUCY.3' },
    { url: 'assets/immagini/lucy/4.jpg', caption: 'CAPTIONS.LUCY.4' },
    { url: 'assets/immagini/lucy/5.jpg', caption: 'CAPTIONS.LUCY.5' },
    { url: 'assets/immagini/lucy/6.jpg', caption: 'CAPTIONS.LUCY.6' },
    { url: 'assets/immagini/lucy/7.jpg', caption: 'CAPTIONS.LUCY.7' },
    { url: 'assets/immagini/lucy/8.jpg', caption: 'CAPTIONS.LUCY.8' },
    { url: 'assets/immagini/lucy/9.jpg', caption: 'CAPTIONS.LUCY.9' },
    { url: 'assets/immagini/lucy/10.jpg', caption: 'CAPTIONS.LUCY.10' },
  ],
  hinata: [
    { url: 'assets/immagini/hinata/1.jpg', caption: 'CAPTIONS.HINATA.1' },
    { url: 'assets/immagini/hinata/2.jpg', caption: 'CAPTIONS.HINATA.2' },
    { url: 'assets/immagini/hinata/3.jpg', caption: 'CAPTIONS.HINATA.3' },
    { url: 'assets/immagini/hinata/4.jpg', caption: 'CAPTIONS.HINATA.4' },
    { url: 'assets/immagini/hinata/5.jpg', caption: 'CAPTIONS.HINATA.5' },
    { url: 'assets/immagini/hinata/6.jpg', caption: 'CAPTIONS.HINATA.6' },
    { url: 'assets/immagini/hinata/7.jpg', caption: 'CAPTIONS.HINATA.7' },
    { url: 'assets/immagini/hinata/8.jpg', caption: 'CAPTIONS.HINATA.8' },
    { url: 'assets/immagini/hinata/9.jpg', caption: 'CAPTIONS.HINATA.9' },
    { url: 'assets/immagini/hinata/10.jpg', caption: 'CAPTIONS.HINATA.10' },
  ],
  zerotwo: [
    { url: 'assets/immagini/zerotwo/1.jpg', caption: 'CAPTIONS.ZEROTWO.1' },
    { url: 'assets/immagini/zerotwo/2.jpg', caption: 'CAPTIONS.ZEROTWO.2' },
    { url: 'assets/immagini/zerotwo/3.jpg', caption: 'CAPTIONS.ZEROTWO.3' },
    { url: 'assets/immagini/zerotwo/4.jpg', caption: 'CAPTIONS.ZEROTWO.4' },
    { url: 'assets/immagini/zerotwo/5.jpg', caption: 'CAPTIONS.ZEROTWO.5' },
    { url: 'assets/immagini/zerotwo/6.jpg', caption: 'CAPTIONS.ZEROTWO.6' },
    { url: 'assets/immagini/zerotwo/7.jpg', caption: 'CAPTIONS.ZEROTWO.7' },
    { url: 'assets/immagini/zerotwo/8.jpg', caption: 'CAPTIONS.ZEROTWO.8' },
    { url: 'assets/immagini/zerotwo/9.jpg', caption: 'CAPTIONS.ZEROTWO.9' },
    { url: 'assets/immagini/zerotwo/10.jpg', caption: 'CAPTIONS.ZEROTWO.10' },
  ],
  marin: [
    { url: 'assets/immagini/marin/1.jpg', caption: 'CAPTIONS.MARIN.1' },
    { url: 'assets/immagini/marin/2.jpg', caption: 'CAPTIONS.MARIN.2' },
    { url: 'assets/immagini/marin/3.jpg', caption: 'CAPTIONS.MARIN.3' },
    { url: 'assets/immagini/marin/4.jpg', caption: 'CAPTIONS.MARIN.4' },
    { url: 'assets/immagini/marin/5.jpg', caption: 'CAPTIONS.MARIN.5' },
    { url: 'assets/immagini/marin/6.jpg', caption: 'CAPTIONS.MARIN.6' },
    { url: 'assets/immagini/marin/7.jpg', caption: 'CAPTIONS.MARIN.7' },
    { url: 'assets/immagini/marin/8.jpg', caption: 'CAPTIONS.MARIN.8' },
    { url: 'assets/immagini/marin/9.jpg', caption: 'CAPTIONS.MARIN.9' },
    { url: 'assets/immagini/marin/10.jpg', caption: 'CAPTIONS.MARIN.10' },
  ],
  rosalina: [
    { url: 'assets/immagini/rosalina/1.jpg', caption: 'CAPTIONS.ROSALINA.1' },
    { url: 'assets/immagini/rosalina/2.jpg', caption: 'CAPTIONS.ROSALINA.2' },
    { url: 'assets/immagini/rosalina/3.jpg', caption: 'CAPTIONS.ROSALINA.3' },
    { url: 'assets/immagini/rosalina/4.jpg', caption: 'CAPTIONS.ROSALINA.4' },
    { url: 'assets/immagini/rosalina/5.jpg', caption: 'CAPTIONS.ROSALINA.5' },
    { url: 'assets/immagini/rosalina/6.jpg', caption: 'CAPTIONS.ROSALINA.6' },
    { url: 'assets/immagini/rosalina/7.jpg', caption: 'CAPTIONS.ROSALINA.7' },
    { url: 'assets/immagini/rosalina/8.jpg', caption: 'CAPTIONS.ROSALINA.8' },
    { url: 'assets/immagini/rosalina/9.jpg', caption: 'CAPTIONS.ROSALINA.9' },
    { url: 'assets/immagini/rosalina/10.jpg', caption: 'CAPTIONS.ROSALINA.10' },
  ],
  rei: [
    { url: 'assets/immagini/rei/1.jpg', caption: 'CAPTIONS.REI.1' },
    { url: 'assets/immagini/rei/2.jpg', caption: 'CAPTIONS.REI.2' },
    { url: 'assets/immagini/rei/3.jpg', caption: 'CAPTIONS.REI.3' },
    { url: 'assets/immagini/rei/4.jpg', caption: 'CAPTIONS.REI.4' },
    { url: 'assets/immagini/rei/5.jpg', caption: 'CAPTIONS.REI.5' },
    { url: 'assets/immagini/rei/6.jpg', caption: 'CAPTIONS.REI.6' },
    { url: 'assets/immagini/rei/7.jpg', caption: 'CAPTIONS.REI.7' },
    { url: 'assets/immagini/rei/8.jpg', caption: 'CAPTIONS.REI.8' },
    { url: 'assets/immagini/rei/9.jpg', caption: 'CAPTIONS.REI.9' },
    { url: 'assets/immagini/rei/10.jpg', caption: 'CAPTIONS.REI.10' },
  ],
  nezuko: [
    { url: 'assets/immagini/nezuko/1.jpg', caption: 'CAPTIONS.NEZUKO.1' },
    { url: 'assets/immagini/nezuko/2.jpg', caption: 'CAPTIONS.NEZUKO.2' },
    { url: 'assets/immagini/nezuko/3.jpg', caption: 'CAPTIONS.NEZUKO.3' },
    { url: 'assets/immagini/nezuko/4.jpg', caption: 'CAPTIONS.NEZUKO.4' },
    { url: 'assets/immagini/nezuko/5.jpg', caption: 'CAPTIONS.NEZUKO.5' },
    { url: 'assets/immagini/nezuko/6.jpg', caption: 'CAPTIONS.NEZUKO.6' },
    { url: 'assets/immagini/nezuko/7.jpg', caption: 'CAPTIONS.NEZUKO.7' },
    { url: 'assets/immagini/nezuko/8.jpg', caption: 'CAPTIONS.NEZUKO.8' },
    { url: 'assets/immagini/nezuko/9.jpg', caption: 'CAPTIONS.NEZUKO.9' },
    { url: 'assets/immagini/nezuko/10.jpg', caption: 'CAPTIONS.NEZUKO.10' },
  ],
  daki: [
    { url: 'assets/immagini/daki/1.jpg', caption: 'CAPTIONS.DAKI.1' },
    { url: 'assets/immagini/daki/2.jpg', caption: 'CAPTIONS.DAKI.2' },
    { url: 'assets/immagini/daki/3.jpg', caption: 'CAPTIONS.DAKI.3' },
    { url: 'assets/immagini/daki/4.jpg', caption: 'CAPTIONS.DAKI.4' },
    { url: 'assets/immagini/daki/5.jpg', caption: 'CAPTIONS.DAKI.5' },
    { url: 'assets/immagini/daki/6.jpg', caption: 'CAPTIONS.DAKI.6' },
    { url: 'assets/immagini/daki/7.jpg', caption: 'CAPTIONS.DAKI.7' },
    { url: 'assets/immagini/daki/8.jpg', caption: 'CAPTIONS.DAKI.8' },
    { url: 'assets/immagini/daki/9.jpg', caption: 'CAPTIONS.DAKI.9' },
    { url: 'assets/immagini/daki/10.jpg', caption: 'CAPTIONS.DAKI.10' },
  ],
  zelda: [
    { url: 'assets/immagini/zelda/1.jpg', caption: 'CAPTIONS.ZELDA.1' },
    { url: 'assets/immagini/zelda/2.jpg', caption: 'CAPTIONS.ZELDA.2' },
    { url: 'assets/immagini/zelda/3.jpg', caption: 'CAPTIONS.ZELDA.3' },
    { url: 'assets/immagini/zelda/4.jpg', caption: 'CAPTIONS.ZELDA.4' },
    { url: 'assets/immagini/zelda/5.jpg', caption: 'CAPTIONS.ZELDA.5' },
    { url: 'assets/immagini/zelda/6.jpg', caption: 'CAPTIONS.ZELDA.6' },
    { url: 'assets/immagini/zelda/7.jpg', caption: 'CAPTIONS.ZELDA.7' },
    { url: 'assets/immagini/zelda/8.jpg', caption: 'CAPTIONS.ZELDA.8' },
    { url: 'assets/immagini/zelda/9.jpg', caption: 'CAPTIONS.ZELDA.9' },
    { url: 'assets/immagini/zelda/10.jpg', caption: 'CAPTIONS.ZELDA.10' },
  ],
  sakura: [
    { url: 'assets/immagini/sakura/1.jpg', caption: 'CAPTIONS.SAKURA.1' },
    { url: 'assets/immagini/sakura/2.jpg', caption: 'CAPTIONS.SAKURA.2' },
    { url: 'assets/immagini/sakura/3.jpg', caption: 'CAPTIONS.SAKURA.3' },
    { url: 'assets/immagini/sakura/4.jpg', caption: 'CAPTIONS.SAKURA.4' },
    { url: 'assets/immagini/sakura/5.jpg', caption: 'CAPTIONS.SAKURA.5' },
    { url: 'assets/immagini/sakura/6.jpg', caption: 'CAPTIONS.SAKURA.6' },
    { url: 'assets/immagini/sakura/7.jpg', caption: 'CAPTIONS.SAKURA.7' },
    { url: 'assets/immagini/sakura/8.jpg', caption: 'CAPTIONS.SAKURA.8' },
    { url: 'assets/immagini/sakura/9.jpg', caption: 'CAPTIONS.SAKURA.9' },
    { url: 'assets/immagini/sakura/10.jpg', caption: 'CAPTIONS.SAKURA.10' },
  ],
  syleny: [
    { url: 'assets/immagini/syleny/1.jpg', caption: 'CAPTIONS.SYLENY.1' },
    { url: 'assets/immagini/syleny/2.jpg', caption: 'CAPTIONS.SYLENY.2' },
    { url: 'assets/immagini/syleny/3.jpg', caption: 'CAPTIONS.SYLENY.3' },
    { url: 'assets/immagini/syleny/4.jpg', caption: 'CAPTIONS.SYLENY.4' },
    { url: 'assets/immagini/syleny/5.jpg', caption: 'CAPTIONS.SYLENY.5' },
    { url: 'assets/immagini/syleny/6.jpg', caption: 'CAPTIONS.SYLENY.6' },
    { url: 'assets/immagini/syleny/7.jpg', caption: 'CAPTIONS.SYLENY.7' },
    { url: 'assets/immagini/syleny/8.jpg', caption: 'CAPTIONS.SYLENY.8' },
    { url: 'assets/immagini/syleny/9.jpg', caption: 'CAPTIONS.SYLENY.9' },
    { url: 'assets/immagini/syleny/10.jpg', caption: 'CAPTIONS.SYLENY.10' },
  ],
  meridiumriaele: [
    { url: 'assets/immagini/meridiumriaele/1.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.1' },
    { url: 'assets/immagini/meridiumriaele/2.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.2' },
    { url: 'assets/immagini/meridiumriaele/3.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.3' },
    { url: 'assets/immagini/meridiumriaele/4.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.4' },
    { url: 'assets/immagini/meridiumriaele/5.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.5' },
    { url: 'assets/immagini/meridiumriaele/6.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.6' },
    { url: 'assets/immagini/meridiumriaele/7.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.7' },
    { url: 'assets/immagini/meridiumriaele/8.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.8' },
    { url: 'assets/immagini/meridiumriaele/9.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.9' },
    { url: 'assets/immagini/meridiumriaele/10.jpg', caption: 'CAPTIONS.MERIDIUMRIAELE.10' },
  ],
  nnumeth: [
    { url: 'assets/immagini/nnumeth/1.jpg', caption: 'CAPTIONS.NNUMETH.1' },
    { url: 'assets/immagini/nnumeth/2.jpg', caption: 'CAPTIONS.NNUMETH.2' },
    { url: 'assets/immagini/nnumeth/3.jpg', caption: 'CAPTIONS.NNUMETH.3' },
    { url: 'assets/immagini/nnumeth/4.jpg', caption: 'CAPTIONS.NNUMETH.4' },
    { url: 'assets/immagini/nnumeth/5.jpg', caption: 'CAPTIONS.NNUMETH.5' },
    { url: 'assets/immagini/nnumeth/6.jpg', caption: 'CAPTIONS.NNUMETH.6' },
    { url: 'assets/immagini/nnumeth/7.jpg', caption: 'CAPTIONS.NNUMETH.7' },
    { url: 'assets/immagini/nnumeth/8.jpg', caption: 'CAPTIONS.NNUMETH.8' },
    { url: 'assets/immagini/nnumeth/9.jpg', caption: 'CAPTIONS.NNUMETH.9' },
    { url: 'assets/immagini/nnumeth/10.jpg', caption: 'CAPTIONS.NNUMETH.10' },
  ],
  nilou: [
    { url: 'assets/immagini/nilou/1.jpg', caption: 'CAPTIONS.NILOU.1' },
    { url: 'assets/immagini/nilou/2.jpg', caption: 'CAPTIONS.NILOU.2' },
    { url: 'assets/immagini/nilou/3.jpg', caption: 'CAPTIONS.NILOU.3' },
    { url: 'assets/immagini/nilou/4.jpg', caption: 'CAPTIONS.NILOU.4' },
    { url: 'assets/immagini/nilou/5.jpg', caption: 'CAPTIONS.NILOU.5' },
    { url: 'assets/immagini/nilou/6.jpg', caption: 'CAPTIONS.NILOU.6' },
    { url: 'assets/immagini/nilou/7.jpg', caption: 'CAPTIONS.NILOU.7' },
    { url: 'assets/immagini/nilou/8.jpg', caption: 'CAPTIONS.NILOU.8' },
    { url: 'assets/immagini/nilou/9.jpg', caption: 'CAPTIONS.NILOU.9' },
    { url: 'assets/immagini/nilou/10.jpg', caption: 'CAPTIONS.NILOU.10' },
  ],
  ciri: [
    { url: 'assets/immagini/ciri/1.jpg', caption: 'CAPTIONS.CIRI.1' },
    { url: 'assets/immagini/ciri/2.jpg', caption: 'CAPTIONS.CIRI.2' },
    { url: 'assets/immagini/ciri/3.jpg', caption: 'CAPTIONS.CIRI.3' },
    { url: 'assets/immagini/ciri/4.jpg', caption: 'CAPTIONS.CIRI.4' },
    { url: 'assets/immagini/ciri/5.jpg', caption: 'CAPTIONS.CIRI.5' },
    { url: 'assets/immagini/ciri/6.jpg', caption: 'CAPTIONS.CIRI.6' },
    { url: 'assets/immagini/ciri/7.jpg', caption: 'CAPTIONS.CIRI.7' },
    { url: 'assets/immagini/ciri/8.jpg', caption: 'CAPTIONS.CIRI.8' },
    { url: 'assets/immagini/ciri/9.jpg', caption: 'CAPTIONS.CIRI.9' },
    { url: 'assets/immagini/ciri/10.jpg', caption: 'CAPTIONS.CIRI.10' },
  ],
  ahri: [
    { url: 'assets/immagini/ahri/1.jpg', caption: 'CAPTIONS.AHRI.1' },
    { url: 'assets/immagini/ahri/2.jpg', caption: 'CAPTIONS.AHRI.2' },
    { url: 'assets/immagini/ahri/3.jpg', caption: 'CAPTIONS.AHRI.3' },
    { url: 'assets/immagini/ahri/4.jpg', caption: 'CAPTIONS.AHRI.4' },
    { url: 'assets/immagini/ahri/5.jpg', caption: 'CAPTIONS.AHRI.5' },
    { url: 'assets/immagini/ahri/6.jpg', caption: 'CAPTIONS.AHRI.6' },
    { url: 'assets/immagini/ahri/7.jpg', caption: 'CAPTIONS.AHRI.7' },
    { url: 'assets/immagini/ahri/8.jpg', caption: 'CAPTIONS.AHRI.8' },
    { url: 'assets/immagini/ahri/9.jpg', caption: 'CAPTIONS.AHRI.9' },
    { url: 'assets/immagini/ahri/10.jpg', caption: 'CAPTIONS.AHRI.10' },
  ],
  sdm: [
    { url: 'assets/immagini/sdm/1.jpg', caption: 'CAPTIONS.SDM.1' },
    { url: 'assets/immagini/sdm/2.jpg', caption: 'CAPTIONS.SDM.2' },
    { url: 'assets/immagini/sdm/3.jpg', caption: 'CAPTIONS.SDM.3' },
    { url: 'assets/immagini/sdm/4.jpg', caption: 'CAPTIONS.SDM.4' },
    { url: 'assets/immagini/sdm/5.jpg', caption: 'CAPTIONS.SDM.5' },
    { url: 'assets/immagini/sdm/6.jpg', caption: 'CAPTIONS.SDM.6' },
    { url: 'assets/immagini/sdm/7.jpg', caption: 'CAPTIONS.SDM.7' },
    { url: 'assets/immagini/sdm/8.jpg', caption: 'CAPTIONS.SDM.8' },
    { url: 'assets/immagini/sdm/9.jpg', caption: 'CAPTIONS.SDM.9' },
    { url: 'assets/immagini/sdm/10.jpg', caption: 'CAPTIONS.SDM.10' },
  ],
  evelynn: [
    { url: 'assets/immagini/evelynn/1.jpg', caption: 'CAPTIONS.EVELYNN.1' },
    { url: 'assets/immagini/evelynn/2.jpg', caption: 'CAPTIONS.EVELYNN.2' },
    { url: 'assets/immagini/evelynn/3.jpg', caption: 'CAPTIONS.EVELYNN.3' },
    { url: 'assets/immagini/evelynn/4.jpg', caption: 'CAPTIONS.EVELYNN.4' },
    { url: 'assets/immagini/evelynn/5.jpg', caption: 'CAPTIONS.EVELYNN.5' },
    { url: 'assets/immagini/evelynn/6.jpg', caption: 'CAPTIONS.EVELYNN.6' },
    { url: 'assets/immagini/evelynn/7.jpg', caption: 'CAPTIONS.EVELYNN.7' },
    { url: 'assets/immagini/evelynn/8.jpg', caption: 'CAPTIONS.EVELYNN.8' },
    { url: 'assets/immagini/evelynn/9.jpg', caption: 'CAPTIONS.EVELYNN.9' },
    { url: 'assets/immagini/evelynn/10.jpg', caption: 'CAPTIONS.EVELYNN.10' },
  ],
  yumeko: [
    { url: 'assets/immagini/yumeko/1.jpg', caption: 'CAPTIONS.YUMEKO.1' },
    { url: 'assets/immagini/yumeko/2.jpg', caption: 'CAPTIONS.YUMEKO.2' },
    { url: 'assets/immagini/yumeko/3.jpg', caption: 'CAPTIONS.YUMEKO.3' },
    { url: 'assets/immagini/yumeko/4.jpg', caption: 'CAPTIONS.YUMEKO.4' },
    { url: 'assets/immagini/yumeko/5.jpg', caption: 'CAPTIONS.YUMEKO.5' },
    { url: 'assets/immagini/yumeko/6.jpg', caption: 'CAPTIONS.YUMEKO.6' },
    { url: 'assets/immagini/yumeko/7.jpg', caption: 'CAPTIONS.YUMEKO.7' },
    { url: 'assets/immagini/yumeko/8.jpg', caption: 'CAPTIONS.YUMEKO.8' },
    { url: 'assets/immagini/yumeko/9.jpg', caption: 'CAPTIONS.YUMEKO.9' },
    { url: 'assets/immagini/yumeko/10.jpg', caption: 'CAPTIONS.YUMEKO.10' },
  ],
  asuna: [
    { url: 'assets/immagini/asuna/1.jpg', caption: 'CAPTIONS.ASUNA.1' },
    { url: 'assets/immagini/asuna/2.jpg', caption: 'CAPTIONS.ASUNA.2' },
    { url: 'assets/immagini/asuna/3.jpg', caption: 'CAPTIONS.ASUNA.3' },
    { url: 'assets/immagini/asuna/4.jpg', caption: 'CAPTIONS.ASUNA.4' },
    { url: 'assets/immagini/asuna/5.jpg', caption: 'CAPTIONS.ASUNA.5' },
    { url: 'assets/immagini/asuna/6.jpg', caption: 'CAPTIONS.ASUNA.6' },
    { url: 'assets/immagini/asuna/7.jpg', caption: 'CAPTIONS.ASUNA.7' },
    { url: 'assets/immagini/asuna/8.jpg', caption: 'CAPTIONS.ASUNA.8' },
    { url: 'assets/immagini/asuna/9.jpg', caption: 'CAPTIONS.ASUNA.9' },
    { url: 'assets/immagini/asuna/10.jpg', caption: 'CAPTIONS.ASUNA.10' },
  ],
  rem: [
    { url: 'assets/immagini/rem/1.jpg', caption: 'CAPTIONS.REM.1' },
    { url: 'assets/immagini/rem/2.jpg', caption: 'CAPTIONS.REM.2' },
    { url: 'assets/immagini/rem/3.jpg', caption: 'CAPTIONS.REM.3' },
    { url: 'assets/immagini/rem/4.jpg', caption: 'CAPTIONS.REM.4' },
    { url: 'assets/immagini/rem/5.jpg', caption: 'CAPTIONS.REM.5' },
    { url: 'assets/immagini/rem/6.jpg', caption: 'CAPTIONS.REM.6' },
    { url: 'assets/immagini/rem/7.jpg', caption: 'CAPTIONS.REM.7' },
    { url: 'assets/immagini/rem/8.jpg', caption: 'CAPTIONS.REM.8' },
    { url: 'assets/immagini/rem/9.jpg', caption: 'CAPTIONS.REM.9' },
    { url: 'assets/immagini/rem/10.jpg', caption: 'CAPTIONS.REM.10' },
  ],
  mitsuri: [
    { url: 'assets/immagini/mitsuri/1.jpg', caption: 'CAPTIONS.MITSURI.1' },
    { url: 'assets/immagini/mitsuri/2.jpg', caption: 'CAPTIONS.MITSURI.2' },
    { url: 'assets/immagini/mitsuri/3.jpg', caption: 'CAPTIONS.MITSURI.3' },
    { url: 'assets/immagini/mitsuri/4.jpg', caption: 'CAPTIONS.MITSURI.4' },
    { url: 'assets/immagini/mitsuri/5.jpg', caption: 'CAPTIONS.MITSURI.5' },
    { url: 'assets/immagini/mitsuri/6.jpg', caption: 'CAPTIONS.MITSURI.6' },
    { url: 'assets/immagini/mitsuri/7.jpg', caption: 'CAPTIONS.MITSURI.7' },
    { url: 'assets/immagini/mitsuri/8.jpg', caption: 'CAPTIONS.MITSURI.8' },
    { url: 'assets/immagini/mitsuri/9.jpg', caption: 'CAPTIONS.MITSURI.9' },
    { url: 'assets/immagini/mitsuri/10.jpg', caption: 'CAPTIONS.MITSURI.10' },
  ],
  kanae: [
    { url: 'assets/immagini/kanae/1.jpg', caption: 'CAPTIONS.KANAE.1' },
    { url: 'assets/immagini/kanae/2.jpg', caption: 'CAPTIONS.KANAE.2' },
    { url: 'assets/immagini/kanae/3.jpg', caption: 'CAPTIONS.KANAE.3' },
    { url: 'assets/immagini/kanae/4.jpg', caption: 'CAPTIONS.KANAE.4' },
    { url: 'assets/immagini/kanae/5.jpg', caption: 'CAPTIONS.KANAE.5' },
    { url: 'assets/immagini/kanae/6.jpg', caption: 'CAPTIONS.KANAE.6' },
    { url: 'assets/immagini/kanae/7.jpg', caption: 'CAPTIONS.KANAE.7' },
    { url: 'assets/immagini/kanae/8.jpg', caption: 'CAPTIONS.KANAE.8' },
    { url: 'assets/immagini/kanae/9.jpg', caption: 'CAPTIONS.KANAE.9' },
    { url: 'assets/immagini/kanae/10.jpg', caption: 'CAPTIONS.KANAE.10' },
  ],
  elizabeth: [
    { url: 'assets/immagini/elizabeth/1.jpg', caption: 'CAPTIONS.ELIZABETH.1' },
    { url: 'assets/immagini/elizabeth/2.jpg', caption: 'CAPTIONS.ELIZABETH.2' },
    { url: 'assets/immagini/elizabeth/3.jpg', caption: 'CAPTIONS.ELIZABETH.3' },
    { url: 'assets/immagini/elizabeth/4.jpg', caption: 'CAPTIONS.ELIZABETH.4' },
    { url: 'assets/immagini/elizabeth/5.jpg', caption: 'CAPTIONS.ELIZABETH.5' },
    { url: 'assets/immagini/elizabeth/6.jpg', caption: 'CAPTIONS.ELIZABETH.6' },
    { url: 'assets/immagini/elizabeth/7.jpg', caption: 'CAPTIONS.ELIZABETH.7' },
    { url: 'assets/immagini/elizabeth/8.jpg', caption: 'CAPTIONS.ELIZABETH.8' },
    { url: 'assets/immagini/elizabeth/9.jpg', caption: 'CAPTIONS.ELIZABETH.9' },
    { url: 'assets/immagini/elizabeth/10.jpg', caption: 'CAPTIONS.ELIZABETH.10' },
  ],
  touka: [
    { url: 'assets/immagini/touka/1.jpg', caption: 'CAPTIONS.TOUKA.1' },
    { url: 'assets/immagini/touka/2.jpg', caption: 'CAPTIONS.TOUKA.2' },
    { url: 'assets/immagini/touka/3.jpg', caption: 'CAPTIONS.TOUKA.3' },
    { url: 'assets/immagini/touka/4.jpg', caption: 'CAPTIONS.TOUKA.4' },
    { url: 'assets/immagini/touka/5.jpg', caption: 'CAPTIONS.TOUKA.5' },
    { url: 'assets/immagini/touka/6.jpg', caption: 'CAPTIONS.TOUKA.6' },
    { url: 'assets/immagini/touka/7.jpg', caption: 'CAPTIONS.TOUKA.7' },
    { url: 'assets/immagini/touka/8.jpg', caption: 'CAPTIONS.TOUKA.8' },
    { url: 'assets/immagini/touka/9.jpg', caption: 'CAPTIONS.TOUKA.9' },
    { url: 'assets/immagini/touka/10.jpg', caption: 'CAPTIONS.TOUKA.10' },
  ],
  kakyoin: [
    { url: 'assets/immagini/kakyoin/1.jpg', caption: 'CAPTIONS.KAKYOIN.1' },
    { url: 'assets/immagini/kakyoin/2.jpg', caption: 'CAPTIONS.KAKYOIN.2' },
    { url: 'assets/immagini/kakyoin/3.jpg', caption: 'CAPTIONS.KAKYOIN.3' },
    { url: 'assets/immagini/kakyoin/4.jpg', caption: 'CAPTIONS.KAKYOIN.4' },
    { url: 'assets/immagini/kakyoin/5.jpg', caption: 'CAPTIONS.KAKYOIN.5' },
    { url: 'assets/immagini/kakyoin/6.jpg', caption: 'CAPTIONS.KAKYOIN.6' },
    { url: 'assets/immagini/kakyoin/7.jpg', caption: 'CAPTIONS.KAKYOIN.7' },
    { url: 'assets/immagini/kakyoin/8.jpg', caption: 'CAPTIONS.KAKYOIN.8' },
    { url: 'assets/immagini/kakyoin/9.jpg', caption: 'CAPTIONS.KAKYOIN.9' },
    { url: 'assets/immagini/kakyoin/10.jpg', caption: 'CAPTIONS.KAKYOIN.10' },
  ],
  itachi: [
    { url: 'assets/immagini/itachi/1.jpg', caption: 'CAPTIONS.ITACHI.1' },
    { url: 'assets/immagini/itachi/2.jpg', caption: 'CAPTIONS.ITACHI.2' },
    { url: 'assets/immagini/itachi/3.jpg', caption: 'CAPTIONS.ITACHI.3' },
    { url: 'assets/immagini/itachi/4.jpg', caption: 'CAPTIONS.ITACHI.4' },
    { url: 'assets/immagini/itachi/5.jpg', caption: 'CAPTIONS.ITACHI.5' },
    { url: 'assets/immagini/itachi/6.jpg', caption: 'CAPTIONS.ITACHI.6' },
    { url: 'assets/immagini/itachi/7.jpg', caption: 'CAPTIONS.ITACHI.7' },
    { url: 'assets/immagini/itachi/8.jpg', caption: 'CAPTIONS.ITACHI.8' },
    { url: 'assets/immagini/itachi/9.jpg', caption: 'CAPTIONS.ITACHI.9' },
    { url: 'assets/immagini/itachi/10.jpg', caption: 'CAPTIONS.ITACHI.10' },
  ]
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
  searchAttempted = false;

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
    this.searchAttempted = false;
    this.showPgGallery = false;
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
    this.searchAttempted = true;
    if (!this.selectedPg) {
      this.showPgGallery = false;
      console.warn(this.translateService.instant('WARNINGS.SELECT_CHARACTER'));
      return;
    }
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
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        path: '/',
      }
    );

    const galleryData = CHARACTER_GALLERIES[character.value];
    if (galleryData) {
      this.pgPhotos = galleryData.map((photo, index) => ({
        url: photo.url,
        caption: this.translateService.instant(
          `CAPTIONS.${character.value.toUpperCase()}.${index + 1}`
        ),
      }));
    } else {
      const pgFolder = character.value.replace('#', '').toLowerCase();
      this.pgPhotos = Array.from({ length: 10 }, (_, i) => ({
        url: `assets/immagini/${pgFolder}/${i + 1}.jpg`,
        caption: this.translateService.instant(
          `CAPTIONS.${character.value.toUpperCase()}.${i + 1}`,
          { fallbackText: `${character.name} - Photo ${i + 1}` }
        ),
      }));
    }
    this.currentImageIndex = 0;
    this.showPgGallery = true;
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
