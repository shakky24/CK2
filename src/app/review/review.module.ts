import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewRoutingModule } from './review-routing.module';
import { ReviewsinglemovieComponent } from './reviewsinglemovie/reviewsinglemovie.component';
// import { SplitParagraphPipe } from 'src/app/pipes/split-paragraph.pipe';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule
  ]
})
export class ReviewModule { }
