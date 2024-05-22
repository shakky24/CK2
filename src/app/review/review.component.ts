import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  providers: [MovieService, SharedDataService],
})
export class ReviewComponent {
  items: any[] = [];
  reviewLength: number = 200;


  constructor(private titleService: Title, private metaService: Meta, private sharedDataService: SharedDataService, private movieService: MovieService, private readonly router: Router) {

    this.updateTitle()
    this.movieService.getMovieReviws().subscribe((data: any[]) => {
      data.sort((a, b) => a.id - b.id);
      this.items = data;
    });

  }

  ngOnInit() {



  }


  updateTitle() {
    // Logic to update title dynamically based on your page content
    this.titleService.setTitle('Reviews-CinemaKompany');
    this.metaService.addTag({ property: 'og:description', content: "Cinema Kompany" })
    this.metaService.addTag({ property: 'og:image', content: "../../assets/images/logo3.png" });
  }

  clickOnReview(movie: any) {
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.router.navigate([`/reviews/${movie?.id}`], { state: { data: movie } });
  }

  showFullReview(movie: any) {

    this.sharedDataService.updateMovieDataFromReview(movie);

    this.router.navigate([`/reviews/${movie?.id}`], { state: { data: movie } });

    // item.review = !item.review;
  }


  goToHomePage() {
    this.router.navigate(['']);
  }


}
