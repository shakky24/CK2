import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { NowInTheatresComponent } from './now-in-theatres/now-in-theatres.component';
import { TopRegionalShowsComponent } from './top-regional-shows/top-regional-shows.component';
import { CarouselComponent } from './cover-page/carousel/carousel.component';
import { FirstCoverComponent } from './cover-page/carousel/first-cover/first-cover.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieNewInTheatresComponent } from './now-in-theatres/movie-new-in-theatres/movie-new-in-theatres.component';
import { MovieTopRegionalShowsComponent } from './top-regional-shows/movie-top-regional-shows/movie-top-regional-shows.component';
import { MatIconModule } from '@angular/material/icon';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { NowInOttComponent } from './now-in-ott/now-in-ott.component';
import { AdThumbnailComponent } from './ad-thumbnail/ad-thumbnail.component';
import { VerticalCarouselComponent } from './vertical-carousel/vertical-carousel.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HomePageComponent,
    NowInTheatresComponent,
    TopRegionalShowsComponent,
    CarouselComponent,
    FirstCoverComponent,
    MovieNewInTheatresComponent,
    MovieTopRegionalShowsComponent,
    UpcomingMoviesComponent,
    NowInOttComponent,
    AdThumbnailComponent,
    VerticalCarouselComponent,
    ImageCarouselComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatIconModule,
    MatDialogModule

  ]
})
export class HomePageModule { }
