import { Component, OnInit } from '@angular/core';
import { StoreOwner } from '../Models/storeOwner';
import { AlertifyService } from '../Services/alertify.service';
import { AuthService } from '../Services/auth.service';
import { DashboardService } from '../Services/dashboard.service';
import { StoreOwnerService } from '../Services/storeOwner.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  counts: any;
  storeOwners: any[];
  storeOwnerIdForEdit: number;
  editStoreOwnerMode: boolean = false;

  constructor(private authService: AuthService, private dashboardService: DashboardService, private storeOwnerService: StoreOwnerService, private alertify: AlertifyService) { }

  loggedIn() {
    if(this.authService.loggedIn())
    {
      return true;
    }
  }

  ngOnInit() {
    this.dashboardService.getCounts().subscribe((data:any) => {
       this.counts = data.Data;
       this.setCounter(this.counts);
     });
     this.storeOwnerService.getStoreOwnerAndReviewsCount().subscribe((response:any) => { this.storeOwners = response.Data; })
  }

  setCounter(counts: any) {
    document.getElementById("usersCount")?.style.setProperty("--num", counts.users);
    document.getElementById("storeOwnersCount")?.style.setProperty("--num", counts.owners);
    document.getElementById("reportsCount")?.style.setProperty("--num", counts.reports);
    document.getElementById("reviewsCount")?.style.setProperty("--num", counts.reviews);
  }

  deleteStoreOwner(id: number) {
    this.storeOwnerService.deleteStoreOwner(id).subscribe((response:any) => { 
      if(response.status){
        this.alertify.success(response.msg);
        window.location.reload();
      }
      else{
        this.alertify.error(response.msg);
      }
    });
  }

  editStoreOwnerToggle(storeOwnerId: number) {
    this.editStoreOwnerMode = true;
    this.storeOwnerIdForEdit = storeOwnerId;
  }

  cancelEditStoreOwner(editStoreOwnerMode: boolean) {
    this.editStoreOwnerMode = editStoreOwnerMode;
  }
  
  

}