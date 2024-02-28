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
  imports:[CarouselComponent, NowInOttComponent, NowInTheatresComponent, TopRegionalShowsComponent, ImageCarouselComponent]
})
export class HomePageComponent {

  constructor(private meta: Meta) {

  }

  ngOnInit() {
    this.meta.addTag({ name: 'description', 
    content: 'This is an article about Angular Meta service' }, true);
  }

}
