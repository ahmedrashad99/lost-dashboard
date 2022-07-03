import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from '../Models/report';
import { Review } from '../Models/review';
import { StoreOwner } from '../Models/storeOwner';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';
import { ReviewService } from '../Services/review.service';
import { StoreOwnerService } from '../Services/storeOwner.service';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
})
export class ReviewAddComponent implements OnInit {

  @Output() cancelAddReview = new EventEmitter();
  review: Review;
  storeOwners: StoreOwner[];
  reports: Report[];
  reviewAddForm: FormGroup;

  constructor(private reviewService: ReviewService, private router: Router, private fb: FormBuilder, 
    private alertify: AlertifyService, private storeOwnerService: StoreOwnerService, private reportService: ReportService) { }

    createAddReviewForm() {
      this.reviewAddForm = this.fb.group({
        ownerID: ['', Validators.required],
        reportID: ['', Validators.required],
        theifName: ['', Validators.required],
        theifNatID: ['', Validators.required],
        theifMobile: ['', Validators.required],
        theifPicture: ['', Validators.required],
        additional_info: ['', Validators.required]
      });
    }

  ngOnInit() {
    this.storeOwnerService.getStoreOwners().subscribe((data:any) => { this.storeOwners = data.Data; this.alertify.success(data.msg); }, 
    error => { this.alertify.error('error'); () => { this.reviewAddForm.get('ownerID')?.setValue('x') }})
    this.reportService.getReports().subscribe((data:any) => { this.reports = data.Data; this.alertify.success(data.msg); },
      error => { this.alertify.error('error'); })
    this.createAddReviewForm();
  }
  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.reviewAddForm.get('theifPicture')?.setValue(selectedFile);
  }

  addReview() {
    const uploadData = new FormData();
      uploadData.append('ownerID', this.reviewAddForm.get('ownerID')?.value);
      uploadData.append('reportID', this.reviewAddForm.get('reportID')?.value);
      uploadData.append('theifName', this.reviewAddForm.get('theifName')?.value);
      uploadData.append('theifNatID', this.reviewAddForm.get('theifNatID')?.value);
      uploadData.append('theifMobile', this.reviewAddForm.get('theifMobile')?.value);
      uploadData.append('theifPicture', this.reviewAddForm.get('theifPicture')?.value);
      uploadData.append('additional_info', this.reviewAddForm.get('additional_info')?.value);

    
      this.reviewService.addReview(uploadData).subscribe((response:any) => {
        if(response.status) {
          this.alertify.success(response.msg); 
          window.location.reload();       
        }
        else {
          this.alertify.error(response.msg);
        }
      }, error => {
        this.alertify.error('Adding a review Failed!');
      }, () => {
        
      });
    
  }

  cancel() {
    this.cancelAddReview.emit(false);
  }

}








