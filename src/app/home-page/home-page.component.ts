import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CarouselComponent } from './cover-page/carousel/carousel.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { NowInOttComponent } from './now-in-ott/now-in-ott.component';
import { NowInTheatresComponent } from './now-in-theatres/now-in-theatres.component';
import { TopRegionalShowsComponent } from './top-regional-shows/top-regional-shows.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [NowInOttComponent, ImageCarouselComponent, HttpClientModule, TopRegionalShowsComponent, NowInTheatresComponent, CarouselComponent],
  providers: [HttpClient]
})
export class HomePageComponent {

  constructor(private meta: Meta) {

  }

  ngOnInit() {
    this.meta.addTag({
      name: 'description',
      content: 'Stay updated with the latest entertainment news, in-depth movie reviews, and box office updates at Cinema Kompany. Get exclusive content and insights on all your favorite films.'
    }, true);
    this.meta.addTag({
      name: 'title',
      content: 'Cinema Kompany: Entertainment News, Movie Reviews, Box Office'
    }, true);
    this.meta.addTag({
      name: 'image',
      content: '../../assets/images/logo3.png'
    }, true);
  }

}
