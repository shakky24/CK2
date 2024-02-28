import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  imports:[CommonModule, RouterOutlet, FooterComponent, HeaderComponent, AboutComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-sample';
}
