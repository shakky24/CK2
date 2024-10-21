import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true
})
export class FooterComponent {

  onInstaClick() {
    window.open('https://www.instagram.com/cinemakompanyofficial', '_blank');
    
  }
  onFbClick() {
    window.open('https://www.facebook.com/CinemaKompany', '_blank');
    
  }
  onTwitterClick() {
    window.open('https://www.x.com/cinemakompany', '_blank');

  }

}
