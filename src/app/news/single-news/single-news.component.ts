import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SplitParagraphPipe } from 'src/app/pipes/split-paragraph.pipe';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';
import { SEOService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.scss'],
  providers: [SharedDataService, SEOService, SplitParagraphPipe, MovieService, HttpClient],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
})
export class SingleNewsComponent implements OnInit {
  imageSource = '';
  description = 'Your long description goes here Your long description goes here Your long description goes here Your long description goes here Your long description goes here Your long description goes here  ...';
  descriptionLimit = 150; // Adjust this as needed
  title: string = '';
  news: string = '';
  rating: number = 3;
  movieName: string = '';
  verdict: string = '';
  paragrapgh2: string = '';
  paragrapgh3: string = '';
  paragrapgh4: string = '';
  paragrapgh5: string = '';
  paragrapgh6: string = '';
  paragrapgh7: string = '';
  reviewLength: number = 1000;
  sEOService: any;
  data: any;
  id: any;
  items: any;

  constructor(
    private sharedDataService: SharedDataService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private meta: Meta,
    private movieService: MovieService
  ) {

    // this.meta.addTag({ property: 'og:description', content: "1" });
    // this.meta.addTag({ property: 'og:image', content: "1" });
    // this.meta.addTag({ property: 'og:title', content: "1" });
    // this.meta.addTag({ property: 'og:description', content: "2" });
    // this.meta.addTag({ property: 'og:image', content: "2" });
    // this.meta.addTag({ property: 'og:title', content: "2" });

    this.route.params.subscribe(params => {
      console.log(params)
      // const imageURL = `https://cinemakompany.com/assets/images/reviews/${movieName}.jpg`;
      // this.metaService.updateTag({ property: 'og:image', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });
      this.id = params['movie_id'];
      this.loadMovieData(this.id);
      console.log(this.title)
    });

    this.movieService.getMovieNews().subscribe((doc: any) => {
      doc.map((ele: any) => {

        if (ele.id == this.id) {
          this.movieName = ele.movieName;
          this.description = ele.description;
          this.imageSource = ele.image;
          this.news = ele.news;
          console.log('sss', this.imageSource);
          this.meta.addTag({ name: 'description', content: ele.description });
          this.meta.addTag({ name: 'image', content: `https://cinemakompany.com/${ele.image}` });
          this.meta.addTag({ name: 'title', content: ele.movieName });
          this.meta.addTag({ name: 'description', content: ele.description });
          this.meta.addTag({ name: 'image', content: `https://cinemakompany.com/${ele.image}` });
          this.meta.addTag({ name: 'title', content: ele.movieName });

          this.meta.addTag({ property: 'og:description', content: ele.description });
          this.meta.addTag({ property: 'og:image', content: ele.image });
          this.meta.addTag({ property: 'og:title', content: ele.movieName });
          this.meta.updateTag({ property: 'og:description', content: ele.description });
          this.meta.updateTag({ property: 'og:image', content: `https://cinemakompany.com/${ele.image}` });
          this.meta.updateTag({ property: 'og:title', content: ele.movieName });
          // console.log("updated", this.meta.getTag("'property=og:description'"))
        }
      })

    })

    // this.data = NEWS.filter(ele => {
    //   if (ele.id == this.id) {
    //     this.movieName = ele.movieName;
    //     this.description = ele.description;
    //     this.imageSource = ele.image
    //     this.meta.addTag({ name: 'description', content: ele.description });
    //     this.meta.addTag({ name: 'image', content: `https://cinemakompany.com/${ele.image}` });
    //     this.meta.addTag({ name: 'title', content: ele.movieName });
    //     this.meta.addTag({ name: 'description', content: ele.description });
    //     this.meta.addTag({ name: 'image', content: `https://cinemakompany.com/${ele.image}` });
    //     this.meta.addTag({ name: 'title', content: ele.movieName });

    //     this.meta.addTag({ property: 'og:description', content: ele.description });
    //     this.meta.addTag({ property: 'og:image', content: ele.image });
    //     this.meta.addTag({ property: 'og:title', content: ele.movieName });
    //     this.meta.updateTag({ property: 'og:description', content: ele.description });
    //     this.meta.updateTag({ property: 'og:image', content: `https://cinemakompany.com/${ele.image}` });
    //     this.meta.updateTag({ property: 'og:title', content: ele.movieName });
    //     // console.log("updated", this.meta.getTag("'property=og:description'"))
    //   }
    // })
    // this.meta.addTag({ property: 'og:description', content: 'hello welcome' });
    // this.meta.addTag({ property: 'og:image', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.addTag({ property: 'og:url', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.updateTag({ property: 'og:description', content: 'hello welcome' });
    // this.meta.updateTag({ property: 'og:image', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });
    // this.meta.updateTag({ property: 'og:url', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });
  }

  ngOnInit(): void {

    this.fetchCarouselData();
    // this.router.events.pipe(
    //   filter((event) => event instanceof NavigationEnd),
    //   map(() => this.route),
    //   map((route) => {
    //     while (route.firstChild) route = route.firstChild;
    //     return route;
    //   }),
    //   filter((route) => route.outlet === 'primary'),
    //   mergeMap((route) => route.data)
    //  )
    //  .subscribe((event) => {
    //   console.log(event)
    //    this.sEOService.updateTitle(event['title']);
    //    this.sEOService.updateOgUrl(event['ogUrl']);
    //    //Updating Description tag dynamically with title
    //    this.sEOService.updateDescription(event['title'] + event['description'])
    //  }); 













    // this.metaService.updateTag({ property: 'og:image', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' });

    // this.imageSource = 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg';
    // this.updateOgImageMetaTag();
    // // this.metaService.addTag({ property: 'og:image', content: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg' }, true);


  }

  updateOgImageMetaTag() {
    this.meta.updateTag({ property: 'og:image', content: this.imageSource });
  }


  showFullDescription() {
    this.descriptionLimit = this.description.length;
  }
  showFullReview() {
    this.reviewLength = this.news.length;
  }
  onMoreReviewClick() {

    this.router.navigate(['/news']);
  }

  loadMovieData(id: string): void {
    const data = this.sharedDataService.getNewsData();

    if (data) {

      // Assuming the data is stored as an object with movie IDs as keys

      if (data.id == id) {


        // // this.titleService.setTitle(`${data?.movieName} Review`);
        // // this.metaService.updateTag({ property: 'og:title', content: `${data?.movieName} Movie Review From CinemaKompany` });
        // // this.metaService.updateTag({ property: 'og:description', content: data?.review });
        // // const imageURL = `https://cinemakompany.com/assets/images/reviews/${data?.movieName}.jpg`;

        // // Compress and update image
        // this.compressAndUpdateImage(imageURL);
        this.imageSource = data?.image;






        this.title = data?.title;
        this.rating = data?.rating;
        this.movieName = data?.movieName;
        this.verdict = data?.verdict;
        this.paragrapgh2 = data?.paragrapgh2;
        this.paragrapgh3 = data?.paragrapgh3;
        this.paragrapgh4 = data?.paragrapgh4;
        this.paragrapgh5 = data?.paragrapgh5;
        this.paragrapgh6 = data?.paragrapgh6;
        this.paragrapgh7 = data?.paragrapgh7;
        this.description = data?.description;
        this.news = data?.news;
      }
    }
  }

  shareContent(): void {
    const dynamicContent = {
      title: 'Dynamic Title',
      description: 'Dynamic Description',
      imageUrl: 'https://cinemakompany.com/assets/images/reviews/${data?.movieName}.jpg',
      url: 'https://example.com/content/1' // Replace '1' with the actual content ID
    };

    const shareUrl = `whatsapp://send?text=${encodeURIComponent(dynamicContent.title + ' - ' + dynamicContent.description + '\n' + dynamicContent.url)}`;

    window.location.href = shareUrl;
  }


  copyToClipboard(): void {
    const shareableUrl = this.getShareableUrl();
    const textField = document.createElement('textarea');
    textField.innerText = shareableUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Link copied to clipboard!');
  }
  dynamicContent = {
    title: 'Review Cinema Kompany',
    description: 'Dynamic Description',
    imageUrl: 'https://cinemakompany.com/assets/images/reviews/Alone-ott.jpg',
    url: 'https://example.com/content/1' // Replace '1' with the actual content ID
  };

  getShareableUrl(): string {
    this.updateDynamicContent();
    return `${this.dynamicContent.url}`;
  }



  updateDynamicContent(): void {
    // Perform any operations to update dynamic content
    this.dynamicContent.description = `${this.movieName} Review`;
    this.dynamicContent.imageUrl = `${this.imageSource}`;
    this.dynamicContent.url = `https://Review-of-${this.movieName}.com/`;
  }

  fetchCarouselData() {
    this.movieService.getMovieNews().subscribe((data: any[]) => {
      console.log(data)
      data.sort((a, b) => a.id - b.id);
      let counter = 0;
      this.items = data.filter(doc => {
        counter += 1;
        if (doc.id != this.id && (counter >= 1 && counter <= data.length - 1)) { return doc }
      })
    });
  }

  onNewsClick(movie: any) {
    this.router.navigate([]).then(res => {
      window.open(`/news/${movie?.id}`, '_blank');
    });
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.fetchCarouselData();
  }

}
