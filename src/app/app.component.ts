import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  imports:[CommonModule, RouterOutlet],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-sample';
}
