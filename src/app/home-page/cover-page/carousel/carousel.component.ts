import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MAIN_MENU_ITEMS } from 'src/app/constants';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, HttpClientModule],
  providers: [MovieService, SharedDataService],

  animations: [
    trigger('slideAnimation', [
      transition('* <=> *', [
        query('.carousel-slide', [style({ transform: 'translateX(80%)', opacity: 0 })], { optional: true }),
        query('.carousel-slide', stagger('0ms', [
          animate('.6s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ]), { optional: true })
      ])
    ]),
    trigger('textAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-80px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('400ms')),
    ]),
    trigger('overlayAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-100px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('400ms 800ms')), // Delay the overlay animation by 1 second
    ]),
  ]
})
export class CarouselComponent implements OnInit, AfterViewInit {
  animationState: string = 'hidden';
  menuItems = MAIN_MENU_ITEMS;
  showIndex = -1;
  a = 0;

  

  constructor(
    private metaService: Meta,
    private titleService: Title,
    private movieService: MovieService,
    private sharedDataService: SharedDataService,
    private readonly router: Router,
    private el: ElementRef,
    @Inject(DOCUMENT) private document: Document,
    private zone: NgZone,
    private renderer: Renderer2) { }

  currentIndex_ = 0; // Index of the currently displayed slide
  // private interval_: any;
  private touchStartX: number = 0;
  private isTouchSlide: boolean = false;
  videoUrl: string = "";
  movieName: string = "";
  isDropdownVisible: any = {
    home: false,
    reviews: false,
  };

  finalArray: any = [];

  activeDropdown: string | null = null;

  slides: any[] = []; // Replace with your image URLs
  // currentIndex_ = 0;
  interval_: any;

  startCarousel(): void {
    this.zone.runOutsideAngular(() => {
      console.log('sf')
      this.interval_ = setInterval(() => {
        console.log('ssf')
        this.zone.run(() => {
          console.log('sssf', this.currentIndex_)
          this.currentIndex_ = (this.currentIndex_ + 1) % this.slides.length;
        });
      }, 2000); // Change 3000 to your desired interval_ in milliseconds
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval_);
  }

  ngOnInit() {
    console.log("ssjsjhsjs")
    this.startCarousel();

    // / Wait for 100ms before starting the animation

    // this.titleService.setTitle('Home-CinemaKompany');
    // this.metaService.updateTag({ property: 'og:title', content: 'Dynamic Page Title' });
    // this.metaService.updateTag({ property: 'og:description', content: 'Description of the page' });
    // this.metaService.updateTag({ property: 'og:image', content: 'https://example.com/dynamic-image.jpg' });

    this.movieService.getMoviesDataFromHomeCarousel().subscribe((data: any[]) => {
      data.sort((a, b) => a.id - b.id);
      this.slides = data;
    });
    // this.finalArray = this.slides.slice(0,2);
    // this.slides = [
    //   { id: 1, image: 'assets/images/NowinTheatres/2018.jpg' },
    //   { id: 2, image: 'assets/images/NowinTheatres/VOS.jpg' },
    //   { id: 3, image: 'assets/images/NowinTheatres/2018.jpg' },
    // ];

  }

  onItemClick(item: string): void {
    // Assuming your route paths are the same as the dropdown items
    this.router.navigate([item]);
  }


  ngAfterViewInit() {

    this.startSlideShow()

  }

  startSlideShow() {

    // this.onFinalArray();
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100); 

    this.zone.runOutsideAngular(() => {

      let i = setInterval(() => {
        console.log('aaaaaaaaaaaaaaaaaaaa', this.a)

        this.a += 10;

      }, 2000)

      if (this.a == 50) {
        console.log(this.a)
        clearInterval(i)
      }
    })


    this.zone.runOutsideAngular(() => {


      this.interval_ = setInterval(() => {
        if (!this.isTouchSlide) {
          this.nextSlide();
        }
      }, 4000);
    })
  }



  previousSlide() {
    this.currentIndex_ = (this.currentIndex_ === 0) ? (this.slides.length - 1) : (this.currentIndex_ - 1);

  }

  dragging: boolean = false;
  threshold: number = 50;
  carouselHeight: number = 1080; // Height in pixels
  carouselWidth: number = 1920; // Width in pixels

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;

    this.dragging = true;
    this.isTouchSlide = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.dragging) {
      const x = event.touches[0].clientX;
      const dx = x - this.touchStartX;
      if (dx > this.threshold) {
        this.previousSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      } else if (dx < -this.threshold) {
        this.nextSlide();
        this.dragging = false;
        this.isTouchSlide = true; // Reset isTouchSlide flag
      }
    }
  }


  prevSlide() {
    this.currentIndex_ = (this.currentIndex_ === 0) ? (this.slides.length - 1) : (this.currentIndex_ - 1);
  }

  nextSlide() {
    this.currentIndex_ = (this.currentIndex_ === this.slides.length - 1) ? 0 : (this.currentIndex_ + 1);
    console.log(this.currentIndex_)

  }

  clickPrevSlide() {
    clearInterval(this.interval_)
    this.currentIndex_ = (this.currentIndex_ === 0) ? (this.slides.length - 1) : (this.currentIndex_ - 1);
    this.interval_ = setTimeout(() => {
      this.prevSlide()
    }, 4000);
  }

  clickNextSlide() {
    clearInterval(this.interval_)

    this.currentIndex_ = (this.currentIndex_ === this.slides.length - 1) ? 0 : (this.currentIndex_ + 1);
    this.interval_ = setTimeout(() => {
      this.nextSlide()
    }, 4000);
  }

  onFinalArray() {
    this.finalArray.push(this.slides[this.currentIndex_ + 1]);
    console.log("current", this.currentIndex_, this.finalArray)
  }



  goToSlide(index: number) {
    this.currentIndex_ = index;
  }

  clickCarouselMovie(movie: any) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/now_in_theatre'], { state: { data: movie } });

  }

  onHomeClick() {
    this.router.navigate(['/home-page/']);

  }

  onAboutClick() {

    this.router.navigate(['/about/']);
  }
  onNewsClick() {

    this.updateMetaTags()
    window.open('news', '_blank');
  }

  onReviewClick() {
    // const newWindow = window.open('', '_blank');
    // this.router.navigate(['/reviews']).then(result => {  window.open(link, '_blank'); });
    // this.router.navigate([]).then(result => {  window.open( `/reviews`, '_blank'); });
    // window.open('/reviews', '_blank');
    // this.router.navigate(['home-page/reviews']);
    // this.router.navigateByUrl('/reviews', { skipLocationChange: true }).then(() => {
    // window.open('/reviews', '_blank');
    // });

    window.open('reviews', '_blank');

    // this.router.navigate(['home-page/reviews'], { state: { newWindow: true } });

    // this.router.navigate(['/reviews/']);

  }

  showDropdown(menuItem: string): void {
    this.activeDropdown = menuItem;
  }

  hideDropdown(): void {
    this.activeDropdown = null;
  }

  onMenuClick(evt: any) {
    console.debug('MenuBarComponent/onMenuClick()');

    if (!('children' in evt)) {
      this.router.navigateByUrl(evt.route);
    }
  }

  scrollToNowInTheatres() {
    this.document.getElementById("nowInTheatresContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });

  }

  scrollToForthcomingReleases() {

    this.document.getElementById("forthcomingReleasesContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });


  }

  scrollToOTT() {

    this.document.getElementById("ottContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });

  }


  private updateMetaTags(): void {


    const staticData = {
      title: 'App component',
      description: 'app componentr description',
      imageUrl: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg',
      url: 'https://example.com/static-url'
    };
    // Update Open Graph meta tags dynamically using dynamicContent
    const titleTag = this.document.querySelector('meta[property="og:title"]');
    if (titleTag) {
      titleTag.setAttribute('content', staticData.title);
    }

    const descriptionTag = this.document.querySelector(
      'meta[property="og:description"]'
    );
    if (descriptionTag) {
      descriptionTag.setAttribute('content', staticData.description);
    }

    const imageTag = this.document.querySelector('meta[property="og:image"]');
    if (imageTag) {
      imageTag.setAttribute('content', staticData.imageUrl);
    }

    const widthTag = this.document.querySelector('meta[property="og:image:width"]');
    if (widthTag) {
      widthTag.setAttribute('content', '100'); // Set the actual width of the image in pixels
    }

    const heightTag = this.document.querySelector('meta[property="og:image:height"]');
    if (heightTag) {
      heightTag.setAttribute('content', '100'); // Set the actual height of the image in pixels
    }

    const urlTag = this.document.querySelector('meta[property="og:url"]');
    if (urlTag) {
      urlTag.setAttribute('content', staticData.url);
    }
  }


}


