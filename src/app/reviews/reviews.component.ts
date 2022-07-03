import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../Services/review.service';
import { Review } from '../Models/review'
import { AlertifyService } from '../Services/alertify.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  
  reviews: Review[];
  addReviewMode: boolean = false;
  editReviewMode: boolean = false;
  reviewIdForEdit: number;

  constructor(private reviewService: ReviewService, private alertify: AlertifyService) { }
  
  editReviewToggle(reviewIdForEdit: number) {
    this.reviewIdForEdit = reviewIdForEdit;
    this.editReviewMode = true;
  }

  ngOnInit() {
    this.reviewService.getReviews().subscribe((data:any) => { this.reviews = data.Data; }, error => { this.alertify.error(error); });
  }
  
  addReviewToggle() {
    this.addReviewMode = true;
  }

  deleteReview(id: number) {
    this.reviewService.deleteReview(id).subscribe((response:any) => { 
      if(response.status){
        this.alertify.success(response.msg);
        window.location.reload();
      }
      else {
        this.alertify.error(response.msg);
      }
     });
  }

  cancelAddReview(addReviewMode: boolean) {
    this.addReviewMode = addReviewMode;
  }

  cancelEditReview(editReviewMode: boolean) {
    this.editReviewMode = editReviewMode;
  }
}
