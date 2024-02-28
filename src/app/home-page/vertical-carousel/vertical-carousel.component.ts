import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-vertical-carousel',
  templateUrl: './vertical-carousel.component.html',
  styleUrls: ['./vertical-carousel.component.scss']
})
export class VerticalCarouselComponent implements OnInit {
  @ViewChild('carousel') private carousel: ElementRef | undefined;
  items: any[] = [];
  selectedIndex = 0;
  itemsPerScreen = 3; // Number of items to display per screen
  translateY = 0; // Initial translation
  itemHeight = 200; // Adjust the height as needed
  zoomedItemScale = 1; 
  selectedItemBackground: string = '';

  currentIndex = 0;


  constructor(private movieService: MovieService) {}

  scroll(direction: 'up' | 'down'): void {
    if (direction === 'up' && this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
    } else if (direction === 'down' && this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  ngOnInit() {
    this.movieService.getMovieFromNowInOtt().subscribe((data: any[]) => {
      data.sort((a, b) => a.id - b.id);

      this.items = data;
      this.selectedItemBackground = this.items[this.selectedIndex].imageURL;

      
      


    });
    // this.startCarousel();

    // Fetch your items or use static data
    // this.items = [
    //   { title: 'Item 1', description: 'Description 1', imageURL: 'image1.jpg' },
    //   { title: 'Item 2', description: 'Description 2', imageURL: 'image2.jpg' },
    //   { title: 'Item 3', description: 'Description 2', imageURL: 'image2.jpg' },
    //   { title: 'Item 4', description: 'Description 2', imageURL: 'image2.jpg' },
    //   { title: 'Item 5', description: 'Description 2', imageURL: 'image2.jpg' },
    //   // Add more items
    // ];
  }
  visibleItemsCount = 1; // Number of items to display at a time
  endIndex = this.visibleItemsCount - 1;

  showNextItems() {
    this.currentIndex += this.visibleItemsCount;
    this.endIndex += this.visibleItemsCount;
    this.selectedItemBackground = this.items[this.currentIndex].imageURL;

    if (this.endIndex >= this.items.length) {
      this.currentIndex = 0;
      this.endIndex = this.visibleItemsCount - 1;
    }
  }

  showPreviousItems() {
    this.currentIndex -= this.visibleItemsCount;
    this.endIndex -= this.visibleItemsCount;
    this.selectedItemBackground = this.items[this.currentIndex].imageURL;

    if (this.currentIndex < 0) {
      this.currentIndex = this.items.length - this.visibleItemsCount;
      this.endIndex = this.items.length - 1;

    }
  }
  // nextItem() {
  //   if (this.selectedIndex < this.items.length - 1) {
  //     this.selectedIndex++;
  //     this.translateY -= this.itemHeight;
  //     this.updateTransform();
  //     this.updateZoomedItem();
  //     this.selectedItemBackground = this.items[this.selectedIndex].imageURL;
  
  //     // Get the next item element by its index
  //     const nextItemElement = document.querySelectorAll('.carousel-item')[this.selectedIndex];
      
  //     // Scroll to the next item element
  //     if (nextItemElement) {
  //       nextItemElement.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //         inline: 'nearest',
  //       });
  //     }
  //   }
  // }
  
  

  // prevItem() {
  //   if (this.selectedIndex > 0) {
  //     this.selectedIndex--;
  //     this.translateY += this.itemHeight;
  //     this.updateTransform();
  //     this.updateZoomedItem();
  //     this.selectedItemBackground = this.items[this.selectedIndex].imageURL;

  
  //     // Get the next item element by its index
  //     const nextItemElement = document.querySelectorAll('.carousel-item')[this.selectedIndex];
      
  //     // Scroll to the next item element
  //     if (nextItemElement) {
  //       nextItemElement.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //         inline: 'nearest',
  //       });
  //     }
  //   }
  // }

  // updateTransform() {
  //   if (this.carousel) {
  //     this.carousel.nativeElement.style.transform = `translateY(${this.translateY}px)`;
  //   }
  // }

  // updateZoomedItem() {
  //   // Reset the scale for all items
  //   const items = document.querySelectorAll('.carousel-item');
  //   items.forEach((item) => {
  //     const element = item as HTMLElement; // Cast the element to HTMLElement
  //     element.style.transform = 'scale(.85)';
  //   });
  
  //   // Apply zoom to the center item
  //   const centerItemIndex = this.selectedIndex % this.items.length; // Handle looping back to the first item
  //   const centerItem = items[centerItemIndex];
  //   if (centerItem) {
  //     const centerElement = centerItem as HTMLElement; // Cast the center item to HTMLElement
  //     centerElement.style.transform = `scale(${this.zoomedItemScale})`;
  //   }
  // }
  
}
