import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component {

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'description', content: 'page1' });
    this.meta.updateTag({ name: 'description', content: 'page1' });
  }


}
