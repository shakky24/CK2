import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare var YT: any;

@Component({
  selector: 'app-first-cover',
  templateUrl: './first-cover.component.html',
  styleUrls: ['./first-cover.component.scss']
})
export class FirstCoverComponent {
  // urlSafe: string = 'TWQjWLwY9ZE';
  // constructor(private sanitizer: DomSanitizer) { }

  // videoId: string = 'TWQjWLwY9ZE';
  // player: any;

  // ngOnInit() {
  //   this.createPlayer();
  // }

  // createPlayer() {
  //   this.player = new YT.Player('youtube-player', {
  //     videoId: this.videoId,
  //     playerVars: {
  //       autoplay: 0,
  //       modestbranding: 1,
  //       showinfo: 0, // Hide title text, share button, and watch later button
  //       controls: 1,
  //       disablekb: 1,
  //       rel: 0,
  //       loop: 0,
  //       playlist: this.videoId,
  //       origin: window.location.origin,
  //       iv_load_policy: 3,
  //       fs: 1,
  //     },
  //     events: {
  //       onReady: this.onPlayerReady,
  //     }
  //   });
  // }

  // onPlayerReady(event: any) {
  //   event.target.mute();
  // }
  // playVideo() {
  //   var videoContainer = document.getElementById('youtube-player');
  //   videoContainer!.innerHTML = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/TWQjWLwY9ZE?autoplay=1" frameborder="0" allowfullscreen></iframe>';
  // }

  slides: any[] = [
    {
      backgroundUrl: 'assets/images/NowinTheatres/adujeevitham_width.jpg',
      videoUrl: 'https://www.youtube.com/embed/TWQjWLwY9ZE',
      thumbnailUrl: 'assets/images/NowinTheatres/2018.jpg',
      writings: 'assets/images/NowinTheatres/2018_writings.png',
    },
    {
      backgroundUrl: '../../../../../.assets/images/NowinTheatres/lucifer_background_image_wide.jpg',
      videoUrl: 'https://www.youtube.com/embed/VIDEO2',
      thumbnailUrl: 'assets/images/NowinTheatres/lucifer_trailer.jpg',
      writings: 'assets/images/NowinTheatres/luifer_writings.png',

    },
    {
      backgroundUrl: '../../../../../.assets/images/NowinTheatres/adujeevitham_width_cleanup.jpg',
      videoUrl: 'https://www.youtube.com/embed/VIDEO3',
      thumbnailUrl: 'assets/images/NowinTheatres/adujeevtiham_trailer.jpg',
      writings: 'assets/images/NowinTheatres/luifer_writings.png',


    }
  ];

  slideOffset: number = 0;
  private interval: any;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private isTouchSlide: boolean = false;


  ngOnInit() {
    this.startSlideShow();
  }

  ngOnDestroy() {
    this.stopSlideShow();
  }

  startSlideShow() {
    this.interval = setInterval(() => {
      if(!this.isTouchSlide){

        this.nextSlide();
      }
    }, 5000);
  }

  stopSlideShow() {
    clearInterval(this.interval);
  }

  nextSlide() {
    this.slideOffset -= 100;



    if (this.slideOffset < -(this.slides.length - 1) * 100) {
      this.slideOffset = this.isTouchSlide ? -(this.slides.length - 1) * 100 : 0;
    }
  }

  // onTouchStart(event: TouchEvent) {
  //   this.touchStartX = event.touches[0].clientX;
  // }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].clientX;
    this.isTouchSlide=false;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50; // Adjust this value to set the swipe sensitivity
  
    if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.previousSlide();
      this.isTouchSlide = true; // Reset isTouchSlide flag
    } else if (this.touchStartX - this.touchEndX > swipeThreshold) {
      this.nextSlide();
      this.isTouchSlide = true; // Reset isTouchSlide flag
    }
  }

dragging:boolean=false;
threshold: number = 50;

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

  previousSlide() {
    this.slideOffset += 100;

    if (this.slideOffset > 0) {
      this.slideOffset = -(this.slides.length - 1) * 100;
    }
  }


  

}


