import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener, NgZone } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
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
export class ImageCarouselComponent {
  // images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Add your image URLs

  slides: any[] = [
    { id: 1, image: 'assets/images/NowinTheatres/2018.jpg' }
  ];; // Array to store the carousel slides

  currentImage: any = '';


  // currentIndex: number = 0;
  // state: string = 'center';
  // backgroundImagePath: any;
  // private autoSlideInterval: any;

  animationState: string = 'hidden';
  showIndex = -1;

  currentIndex = 0; // Index of the currently displayed slide
  private interval: any;
  private touchStartX: number = 0;
  private isTouchSlide: boolean = false;

  constructor(private movieService: MovieService, private zone: NgZone) {


    this.movieService.getMoviesDataFromAdvertisement().subscribe((ele: any[]) => {
      ele.sort((a, b) => a.id - b.id);
      console.log(ele);
      this.slides = ele;
      console.log(this.slides)
      this.currentImage = "https://cinemakompany.com/" + this.slides[this.currentIndex].image;
      console.log(this.currentImage)
    });
  }

  ngOnInit(): void {

    console.log("loading component")
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100); // Wait for 100ms before starting the animation


    this.startSlideShow();
    console.log("component loaded")


  }


  startSlideShow() {
    this.zone.runOutsideAngular(() => {

      console.log("zonee1")
      this.interval = setInterval(() => {
        if (!this.isTouchSlide) {
          console.log("zonee2")

          this.zone.run(() => {
            this.nextSlide();
          }
          )
        }
      }, 4000);
    })
  }

  private stopSlideShow() {
    clearInterval(this.interval);
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

  ngOnChanges() {
    console.log("changes")
    this.currentImage = "https://cinemakompany.com/" + this.slides[this.currentIndex].image;
    console.log(this.currentImage)
  }


  getCurrentImage(): string {
    console.log("this.slides", this.slides, this.currentIndex, "https://cinemakompany.com/" + this.slides[this.currentIndex].image)
    return "https://cinemakompany.com/" + this.slides[this.currentIndex].image;
  }

  getNextImage(): string {
    console.log("this.slides", this.slides)

    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    return "https://cinemakompany.com/" + this.slides[nextIndex].image;
  }

  getPreviousImage(): string {
    console.log("this.slides", this.slides)

    const previousIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    return "https://cinemakompany.com/" + this.slides[previousIndex].image;
  }

  handleTopButtonClick(): void {
    this.stopSlideShow()

    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    // Add logic for top button click
    this.startSlideShow()
  }

  handleBottomButtonClick(): void {
    this.stopSlideShow()
    // Move to the next image
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.startSlideShow()
  }
}
