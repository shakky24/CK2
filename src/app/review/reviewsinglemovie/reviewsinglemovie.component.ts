import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SharedDataService } from 'src/app/services/SharedDataService';
import { MovieService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-reviewsinglemovie',
  templateUrl: './reviewsinglemovie.component.html',
  styleUrls: ['./reviewsinglemovie.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [SharedDataService, MovieService],
})
export class ReviewsinglemovieComponent implements OnInit {
  imageSource = '';
  description = '';
  descriptionLimit = 150; // Adjust this as needed
  title: string = '';
  review: string = '';
  rating: number = 3;
  movieName: string = '';
  verdict: string = '';
  paragrapgh2: string = '';
  paragrapgh3: string = '';
  paragrapgh4: string = '';
  paragrapgh5: string = '';
  paragrapgh6: string = '';
  paragrapgh7: string = '';
  reviewLength: number = 1000;
  items: any[] = [];
  id: any;

  constructor(
    private sharedDataService: SharedDataService,
    private readonly router: Router,
    private route: ActivatedRoute,
    private metaService: Meta,
    private titleService: Title,
    private imageCompress: NgxImageCompressService,
    private movieService: MovieService
  ) {

  }

  ngOnInit(): void {
    console.log("first")
    // this.metaService.updateTag({ property: 'og:image', content: 'https://craftangelsbysita.com/assets/images/reviews/Alone-ott.jpg' });

    this.route.params.subscribe(params => {

      this.id = params['movie_id'];
      this.loadMovieData(this.id);
    });

    this.movieService.getMovieReviws().subscribe((doc: any) => {
      doc.map((data: any) => {
        if (data.id == this.id) {
          this.titleService.setTitle(`${data?.movieName} News`);
          this.metaService.updateTag({ property: 'og:title', content: `${data?.movieName} Movie News From CinemaKompany` });
          this.metaService.updateTag({ property: 'og:description', content: data?.description });
          this.metaService.updateTag({ property: 'og:image', content: `https://craftangelsbysita.com/${data.image}` });
         }
      })
    })


    this.fetchCarouselData()
  }


  showFullDescription() {
    this.descriptionLimit = this.description.length;
  }
  showFullReview() {
    this.reviewLength = this.review.length;
  }
  onMoreReviewClick() {

    this.router.navigate(['reviews']);
  }

  loadMovieData(id: string): void {
    const data = this.sharedDataService.getMovieDataReview();

    if (data) {

      // Assuming the data is stored as an object with movie IDs as keys

      if (data.id == id) {



        const imageURL = `https://craftangelsbysita.com/assets/images/reviews/${data?.movieName}.jpg`;


        // Compress and update image
        this.compressAndUpdateImage(imageURL);
        this.imageSource = data?.image;






        this.title = data?.title;
        this.rating = data?.rating;
        this.movieName = data?.movieName;
        this.verdict = data?.verdict;
        this.paragrapgh2 = data?.paragrapgh2;
        this.paragrapgh3 = data?.paragrapgh3;
        this.paragrapgh4 = data?.paragrapgh4;
        this.paragrapgh5 = data?.paragrapgh5;
        this.paragrapgh6 = data?.paragrapgh6;
        this.paragrapgh7 = data?.paragrapgh7;
        this.description = data?.description;
        this.review = data?.review;
      }
    }
  }

  compressAndUpdateImage(imageURL: string): void {
    fetch(imageURL)
      .then(response => response.blob())
      .then(blob => this.compressImage(blob))
      .then(compressedBlob => {
        const compressedImageURL = URL.createObjectURL(compressedBlob);
        // this.metaService.updateTag({ property: 'og:image', content: compressedImageURL });
        URL.revokeObjectURL(compressedImageURL); // Clean up
      })
      .catch(error => console.error('Error compressing image:', error));
  }

  compressImage(blob: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx) {
            canvas.width = 300; // Set width to 300px
            canvas.height = img.height * (canvas.width / img.width);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((resolve as any), 'image/jpeg', 0.75); // JPEG with 75% quality
          } else {
            reject(new Error('Canvas context is null'));
          }
        };
        img.onerror = error => reject(error);
      };
      reader.onerror = error => reject(error);
    });
  }

  fetchCarouselData() {
    this.movieService.getMovieReviws().subscribe((data: any[]) => {
      data.sort((a, b) => a.id - b.id);
      let counter = 0;
      this.items = data.filter(doc => {
        counter += 1;
        if (doc.id != this.id && (counter >= 1 && counter <= data.length - 1)) { return doc }
      })
    });
  }

  onReviewClick(movie: any) {
    this.router.navigate([]).then(res => {
      window.open(`/reviews/${movie?.id}`, '_blank');
    });
    this.sharedDataService.updateMovieDataFromReview(movie);
    this.fetchCarouselData();
  }

}
