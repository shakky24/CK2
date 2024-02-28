import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';
import { MoreVideosModalComponent } from '../../more-videos-modal/more-videos-modal.component';

@Component({
  selector: 'app-top-regional-shows',
  templateUrl: './top-regional-shows.component.html',
  styleUrls: ['./top-regional-shows.component.scss'],
  standalone:true,
  imports:[CommonModule, MatIconModule, HttpClientModule],
  providers:[MovieService, SharedDataService ],
})
export class TopRegionalShowsComponent {
 
  movies: any[] = [];

  showStar:boolean=false;

  constructor(public dialog: MatDialog,private movieService: MovieService,private sharedDataService: SharedDataService,private readonly router: Router) {}
  ngOnInit() {
    this.movieService.getMoviesDataFromForthcomingReleases().subscribe((data: any[]) => {
      data.sort((a, b) => a.id - b.id);

      this.movies = data;


    });
  }
  clickNowInTheatres(movie:any){

    this.sharedDataService.updateMovieData(movie);

    this.router.navigate(['/home-page/now_in_theatre'],{ state: { data: movie } });

    
  }

  getStars(rating: number): { filled: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ filled: i <= rating });
    }
    return stars;
  }

  openMoreVideosModal() {
    const dialogRef = this.dialog.open(MoreVideosModalComponent, {
      height: '90%', // Adjust the width as per your design
      width:'75%', // Adjust the width as per your design
      data: { movies: this.movies }
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
