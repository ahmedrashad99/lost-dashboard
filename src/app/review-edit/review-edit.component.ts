import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from '../Models/report';
import { Review } from '../Models/review';
import { StoreOwner } from '../Models/storeOwner';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';
import { ReviewService } from '../Services/review.service';
import { StoreOwnerService } from '../Services/storeOwner.service';

@Component({
  selector: 'app-review-edit',
  templateUrl: './review-edit.component.html',
  styleUrls: ['./review-edit.component.scss']
})
export class ReviewEditComponent implements OnInit {
  @Input() reviewIdForEdit: number;
  @Output() cancelEditReview = new EventEmitter();
  review: Review;
  storeOwners: StoreOwner[];
  reports: Report[];
  @ViewChild('reviewEditForm') reviewEditForm: NgForm;

  constructor(private reviewService: ReviewService, private router: Router, private fb: FormBuilder, 
    private alertify: AlertifyService, private storeOwnerService: StoreOwnerService, private reportService: ReportService) { }

  ngOnInit() {
    this.storeOwnerService.getStoreOwners().subscribe((data:any) => { 
    if(data.status){
      this.storeOwners = data.Data; 
      this.alertify.success(data.msg);
    }
    else {
      this.alertify.error(data.msg);
    }
    }, 
    error => { this.alertify.error('error'); () => {  }})
    this.reportService.getReports().subscribe((data:any) => { this.reports = data.Data; this.alertify.success(data.msg); },
      error => { this.alertify.error('error'); })
    this.reviewService.getReview(this.reviewIdForEdit).subscribe((data:any) => { this.review = data.Data; this.alertify.success(data.msg); })
    
  }
  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.review.theifPicture = selectedFile;
  }

  editReview() {
    const uploadedData = new FormData();
      uploadedData.append('ownerID', this.review.ownerID.toString());
      uploadedData.append('reportID', this.review.reportID.toString());
      uploadedData.append('theifName', this.review.theifName);
      uploadedData.append('theifNatID', this.review.theifNatID.toString());
      uploadedData.append('theifMobile', this.review.theifMobile.toString());
      uploadedData.append('theifPicture', this.review.theifPicture);
      uploadedData.append('additional_info', this.review.additional_info);

    
      this.reviewService.editReview(this.review.reviewID, uploadedData).subscribe((response:any) => {
        if(response.status) {
          this.alertify.success(response.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(response.msg);
        }
      }, error => {
        this.alertify.error('Editing a review Failed!');
      }, () => {  });
    
  }

  cancel() {
    this.cancelEditReview.emit(false);
  }

}








