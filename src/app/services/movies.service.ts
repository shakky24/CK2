import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMoviesData(): Observable<any[]> {
    // return assets/images/NowinTheatres/now_in_theatres.json
    // return this.http.get<any[]>('assets/images/NowinTheatres/now_in_theatres.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/NowinTheatres/now_in_theatres.json');
  }

  getMoviesDataFromForthcomingReleases(): Observable<any[]> {
    // return this.http.get<any[]>('assets/images/ForthcomingReleases/ForthcomingReleases.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/ForthcomingReleases/ForthcomingReleases.json');

  }

  getMoviesDataFromHomeCarousel(): Observable<any[]> {
    // return this.http.get<any[]>('assets/images/home-carousel/Home_Carousel.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/home-carousel/Home_Carousel.json');

  }
  
  getMoviesDataFromAdvertisement(): Observable<any[]> {
    console.log("Called")
    // return this.http.get<any[]>('assets/images/advertisement/advertisement.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/advertisement/advertisement.json');

  }

  getMovieReviws(): Observable<any[]> {
    // return this.http.get<any[]>('assets/images/reviews/reviews.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/reviews/reviews.json');

  }

  getMovieNews(): Observable<any[]> {
    // return this.http.get<any[]>('assets/images/news/news.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/news/news.json');

  }

  getMovieFromNowInOtt(): Observable<any[]> {
    // return this.http.get<any[]>('assets/images/NowinOTT/Now_in_Ott.json');
    return this.http.get<any[]>('https://craftangelsbysita.com/assets/images/NowinOTT/Now_in_Ott.json');

  }
}
