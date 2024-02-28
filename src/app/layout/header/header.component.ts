import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MAIN_MENU_ITEMS } from 'src/app/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports:[CommonModule, MatIconModule]
})
export class HeaderComponent {

  menuItems = MAIN_MENU_ITEMS;
	showIndex = -1;

  isDropdownVisible:any = {
    home: false,
    reviews: false,
  };
  showDropdown(key: string) {
    this.isDropdownVisible[key] = true;
  }

  hideDropdown(key: string) {
    this.isDropdownVisible[key] = false;
  }

  constructor(private readonly router: Router) {}

  onHomeClick(){
    this.router.navigate(['/home-page/']);
    
  }
  onReviewsClick(){
    this.router.navigate(['home-page/reviews/']);
    
  }
  onMenuClick(evt: any) {
		console.debug('MenuBarComponent/onMenuClick()');

		if (!('children' in evt)) {
			this.router.navigateByUrl(evt.route);
		}
	}

  scrollToNowInTheatres() {
    document.getElementById("nowInTheatresContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });
    
  }
  
  scrollToForthcomingReleases() {

    document.getElementById("forthcomingReleasesContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });

  
  }
  
  scrollToOTT() {

    document.getElementById("ottContent")?.scrollIntoView({
      behavior: "smooth", block: "start",
      inline: "nearest"
    });

  }

}
