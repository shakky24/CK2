import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NewsComponent } from './news/news.component';
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';
import { ReviewComponent } from './review/review.component';
import { ReviewsinglemovieComponent } from './review/reviewsinglemovie/reviewsinglemovie.component';

export const routes: Routes = [
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'news', component: NewsComponent },
  { path: '', component: HomePageComponent },
  { path: 'news/:movie_id', component: SingleNewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reviews', component: ReviewComponent },
  { path: 'reviews/:movie_id', component: ReviewsinglemovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
