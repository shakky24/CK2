import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-ad-thumbnail',
  templateUrl: './ad-thumbnail.component.html',
  styleUrls: ['./ad-thumbnail.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('* <=> *', [
        query('.carousel-slide', style({ transform: 'translateX(80%)', opacity: 0 })),
        query('.carousel-slide', stagger('0ms', [
          animate('.5s ease-in-out', style({ transform: 'translateX(0)', opacity: 1 }))
        ]))
      ])
    ]),
    trigger('textAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-80px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('600ms')),
    ]),
    trigger('overlayAnimation', [
      state('hidden', style({ opacity: 0, transform: 'translateX(-100px)' })),
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('hidden => visible', animate('600ms 800ms')), // Delay the overlay animation by 1 second
    ]),
  ]
})
export class AdThumbnailComponent {

  animationState: string = 'hidden';
  showIndex = -1;

  constructor(private movieService: MovieService, private sharedDataService: SharedDataService, private readonly router: Router, private el: ElementRef) { }


  images: string[] = [
    'assets/images/287446.jpg',
    'assets/images/NowinTheatres/2018.jpg',
    'path/to/image3.jpg',
    // ... add more image paths as needed
  ];

  activeImageIndex: number = 0;



  slides: any[] = [
    { id: 1, image: 'assets/images/NowinTheatres/2018.jpg' }
  ];; // Array to store the carousel slides
  currentIndex = 0; // Index of the currently displayed slide
  private interval: any;
  private touchStartX: number = 0;
  private isTouchSlide: boolean = false;
  videoUrl: string = "";
  movieName: string = "";
  isDropdownVisible: any = {
    home: false,
    reviews: false,
  };
  showDropdown(key: string) {
    this.isDropdownVisible[key] = true;
  }

  hideDropdown(key: string) {
    this.isDropdownVisible[key] = false;
  }


  slideTop() {
    this.activeImageIndex = (this.activeImageIndex - 1 + this.images.length) % this.images.length;
  }

  slideBottom() {
    this.activeImageIndex = (this.activeImageIndex + 1) % this.images.length;
  }
  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100); // Wait for 100ms before starting the animation


    this.movieService.getMovieReviws().subscribe((data: any[]) => {

      this.slides = data.slice(0, 3);;


    });
    // this.slides = [
    //   { id: 1, image: 'assets/images/NowinTheatres/2018.jpg' },
    //   { id: 2, image: 'assets/images/NowinTheatres/VOS.jpg' },
    //   { id: 3, image: 'assets/images/NowinTheatres/2018.jpg' },
    // ];
    this.startSlideShow()
  }

  clickMoreReview() {

    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/reviews']);
    })
    // this.router.navigate(['/reviews/']);

  }

  ngAfterViewInit() {
  }
  startSlideShow() {


    this.interval = setInterval(() => {
      if (!this.isTouchSlide) {


        this.nextSlide();
      }
    }, 4000);
  }



  previousSlide() {
    this.currentIndex = (this.currentIndex === 0) ? (this.slides.length - 1) : (this.currentIndex - 1);

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
    this.currentIndex = (this.currentIndex === 0) ? (this.slides.length - 1) : (this.currentIndex - 1);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : (this.currentIndex + 1);
  }

  clickPrevSlide() {
    clearInterval(this.interval)
    this.currentIndex = (this.currentIndex === 0) ? (this.slides.length - 1) : (this.currentIndex - 1);
    this.interval = setTimeout(() => {
      this.prevSlide()
    }, 4000);
  }

  clickNextSlide() {
    clearInterval(this.interval)

    this.currentIndex = (this.currentIndex === this.slides.length - 1) ? 0 : (this.currentIndex + 1);
    this.interval = setTimeout(() => {
      this.nextSlide()
    }, 4000);
  }




  goToSlide(index: number) {
    this.currentIndex = index;
  }

  clickCarouselMovie(movie: any) {
    this.sharedDataService.updateMovieData(movie);
    this.router.navigate(['/now_in_theatre'], { state: { data: movie } });

  }

  onHomeClick() {
    this.router.navigate(['/home-page/']);

  }
  onReviewsClick() {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['/reviews']);
    })
    // this.router.navigate(['/reviews/']);

  }

  onMenuClick(evt: any) {
    console.debug('MenuBarComponent/onMenuClick()');

    if (!('children' in evt)) {
      this.router.navigateByUrl(evt.route);
    }
  }

  calculatePosition(index: number) {
    const column = (index % 3) + 1;
    const row = Math.floor(index / 3) + 1;
    return { row, column };
  }

}
