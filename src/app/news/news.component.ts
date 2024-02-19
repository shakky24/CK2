import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NEWS } from 'src/assets/images/news/news';
import { SplitParagraphPipe } from '../pipes/split-paragraph.pipe';

@Component({ 
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone:true,
  imports:[CommonModule, SplitParagraphPipe],
})
export class NewsComponent implements OnInit {
  items: any[] = [];
  reviewLength: number = 800;


  constructor(
    private titleService: Title,
    private router: Router,
    private meta: Meta
  ) {

    // this.meta.addTag(
    //   { name: 'description', content: 'summary_large_image' },
    // );

    // this.meta.addTag({ property: 'og:description', content: "desc" })

  }

  ngOnInit() {

    // setTimeout(() => {

    //   console.log("this.meta", this.meta.getTags('description'), this.meta.getTag('name=description'), this.meta.getTag('title'), this.meta)
    // }, 5000)


    // this.router.events
    //   .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     map(() => this.activatedRoute),
    //     map((route) => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     }),
    //     filter((route) => route.outlet === 'primary'),
    //     mergeMap((route) => route.data),
    //     tap(({ title, description }: Data) => {
    //       this.metaService.updateTitle(title);
    //       this.metaService.updateDescription(description);
    //     })
    //   ).subscribe();



    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd),
    // )
    //   .subscribe(() => {

    //     var rt = this.getChild(this.activatedRoute)

    //     rt.data.subscribe((data:any) => {
    //       console.log(data);
    //       this.titleService.setTitle(data.title)

    //       if (data.descrption) {
    //         this.metaService.updateTag({ name: 'description', content: data.descrption })
    //       } else {
    //         this.metaService.removeTag("name='description'")
    //       }

    //       if (data.robots) {
    //         this.metaService.updateTag({ name: 'robots', content: data.robots })
    //       } else {
    //         this.metaService.updateTag({ name: 'robots', content: "follow,index" })
    //       }

    //       if (data.ogUrl) {
    //         this.metaService.updateTag({ property: 'og:url', content: data.ogUrl })
    //       } else {
    //         this.metaService.updateTag({ property: 'og:url', content: this.router.url })
    //       }

    //       if (data.ogTitle) {
    //         this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
    //       } else {
    //         this.metaService.removeTag("property='og:title'")
    //       }

    //       if (data.ogDescription) {
    //         this.metaService.updateTag({ property: 'og:description', content: data.ogDescription })
    //       } else {
    //         this.metaService.removeTag("property='og:description'")
    //       }

    //       if (data.ogImage) {
    //         this.metaService.updateTag({ property: 'og:image', content: data.ogImage })
    //       } else {
    //         this.metaService.removeTag("property='og:image'")
    //       }


    //     })

    //   })





    // this.movieService.getMovieNews().subscribe((data: any[]) => {
    //   data.sort((a, b) => a.id - b.id);
    //   this.items = data;
    // });

    NEWS.sort((a: any, b: any) => a.id - b.id);
    this.items = NEWS;
  }


  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }


  updateTitle() {
    // Logic to update title dynamically based on your page content
    this.titleService.setTitle('News-CinemaKompany');
  }

  clickOnReview(movie: any) {
    // this.sharedDataService.updateNewsData(movie);
    this.router.navigate([`home-page/news/${movie?.id}`], { state: { data: movie } });
  }

  showFullReview(movie: any) {

    // this.sharedDataService.updateMovieDataFromReview(movie);

    this.router.navigate([`home-page/news/${movie?.id}`], { state: { data: movie } });

    // item.review = !item.review;
  }


  goToHomePage() {
    this.router.navigate(['/home-page/']);
  }

}
