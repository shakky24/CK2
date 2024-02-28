import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/SharedDataService';

@Component({
  selector: 'app-movie-new-in-theatres',
  templateUrl: './movie-new-in-theatres.component.html',
  styleUrls: ['./movie-new-in-theatres.component.scss']
})
export class MovieNewInTheatresComponent {
  imageSource = 'assets/images/NowinTheatres/2018.jpg';
  description = 'Your long description goes here Your long description goes here Your long description goes here Your long description goes here Your long description goes here Your long description goes here  ...';
  descriptionLimit = 150; // Adjust this as needed
  title:string='';

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    const data = this.sharedDataService.getMovieData();
    this.imageSource =data?.imageURL
    this.title =data?.title
    this.description = data?.description
    // Use the data in your component
  }
  showFullDescription() {
    this.descriptionLimit = this.description.length;
  }
  

}
