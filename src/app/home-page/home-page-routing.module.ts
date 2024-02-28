import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { MovieNewInTheatresComponent } from './now-in-theatres/movie-new-in-theatres/movie-new-in-theatres.component';
import { NowInOttComponent } from './now-in-ott/now-in-ott.component';
import { UpcomingMoviesComponent } from './upcoming-movies/upcoming-movies.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'now_in_theatre', component: MovieNewInTheatresComponent },
  { path: 'ott', component: NowInOttComponent },
  { path: 'Upcomingreleases', component: UpcomingMoviesComponent },
  { path: 'ImageCarouselComponent', component: ImageCarouselComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
