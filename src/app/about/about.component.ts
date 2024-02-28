import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone:true,
  imports:[MatIconModule]
})
export class AboutComponent {
  constructor(
      private readonly router: Router,

    ){}

  clickHome(){
    this.router.navigate(['']);

  }
}
