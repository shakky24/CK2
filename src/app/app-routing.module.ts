import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { Page1Component } from './page1/page1.component';
import { Page2Component } from './page2/page2.component';

export const routes: Routes = [
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component },
  { path: 'news', component: NewsComponent },
  { path: '', component: NewsComponent },
  { path: 'news/:movie_id', component: SingleNewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
