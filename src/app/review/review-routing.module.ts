import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewComponent } from './review.component';
import { ReviewsinglemovieComponent } from './reviewsinglemovie/reviewsinglemovie.component';

const routes: Routes = [
  { path: '', component: ReviewComponent },
  { path: ':movie_id', component: ReviewsinglemovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
