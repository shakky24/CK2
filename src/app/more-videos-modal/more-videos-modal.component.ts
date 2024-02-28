import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/SharedDataService';

@Component({
  selector: 'app-more-videos-modal',
  templateUrl: './more-videos-modal.component.html',
  styleUrls: ['./more-videos-modal.component.scss'],
  imports:[CommonModule,MatIconModule],
  standalone: true,
})
export class MoreVideosModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MoreVideosModalComponent>,
    private sharedDataService: SharedDataService,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(){
    this.dialogRef.close();
  }

  clickOnMovieCard(movie:any){
    console.log("clickOnMovieCard",movie);
    this.sharedDataService.updateMovieData(movie);
    this.dialogRef.close();

    this.router.navigate(['/home-page/now_in_theatre'],{ state: { data: movie[0] } });
  }

}
