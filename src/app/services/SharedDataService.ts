import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private storageKey = 'movieData';
  private storageKeyReview = 'ReviewmovieData';
  private storageKeyNews = 'NewsData';

  updateMovieData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  updateMovieDataFromReview(data: any) {
    localStorage.setItem(this.storageKeyReview, JSON.stringify(data));
  }

  updateNewsData(data: any) {
    localStorage.setItem(this.storageKeyNews, JSON.stringify(data));
  }

  getNewsData(): any {
    const data = localStorage.getItem(this.storageKeyNews);
    return data ? JSON.parse(data) : null;
  }

  getMovieData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }
  getMovieDataReview(): any {
    const data = localStorage.getItem(this.storageKeyReview);
    return data ? JSON.parse(data) : null;
  }
}
