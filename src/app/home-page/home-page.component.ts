import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { NowInOttComponent } from './now-in-ott/now-in-ott.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [NowInOttComponent, ImageCarouselComponent]
})
export class HomePageComponent {

  constructor(private meta: Meta) {

  }

  ngOnInit() {
    this.meta.addTag({
      name: 'description',
      content: 'This is an article about Angular Meta service'
    }, true);
  }

}
