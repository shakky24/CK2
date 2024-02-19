import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page2',
  standalone: true,
  imports: [],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component {
  
  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'page2' });
    this.meta.updateTag({ name: 'description', content: 'page2' });
  }

}
