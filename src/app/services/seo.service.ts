import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SEOService {

  constructor(private title: Title, private meta: Meta,private http: HttpClient) { }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string) {
    this.meta.updateTag({ name: 'og:url', content: url })
  }

  updateDescription(desc: string) {
    this.meta.updateTag({ name: 'og:description', content: "desc-1" })
  }

  addTag(desc: string) {
    this.meta.updateTag
  }


  getDynamicContent(url: string): Observable<any> {
    // Make an HTTP request to your server or API to fetch dynamic content based on the URL
    return this.http.get<any>(`https://jsonplaceholder.typicode.com/todos/1`);
  }
}
