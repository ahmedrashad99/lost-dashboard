import { Component, OnInit } from '@angular/core';
import { StoreOwner } from '../Models/storeOwner';
import { AlertifyService } from '../Services/alertify.service';
import { StoreOwnerService } from '../Services/storeOwner.service';

@Component({
  selector: 'app-storeOwners',
  templateUrl: './storeOwners.component.html',
  styleUrls: ['./storeOwners.component.scss']
})
export class StoreOwnersComponent implements OnInit {
  storeOwners: StoreOwner[];
  storeOwnerIdForEdit: number;
  addStoreOwnerMode: boolean = false;
  editStoreOwnerMode: boolean = false;

  constructor(private storeOwnerService: StoreOwnerService, private alertifyService: AlertifyService) { }
  

  ngOnInit() {
    this.storeOwnerService.getStoreOwners().subscribe((data:any) => { this.storeOwners = data.Data;});
  }

  deleteStoreOwner(id: number) {
    this.storeOwnerService.deleteStoreOwner(id).subscribe(() => { this.alertifyService.success("User Successfully Deleted!") });
  }
  
  addStoreOwnerToggle() {
    this.addStoreOwnerMode = true;
  }

  editStoreOwnerToggle(storeOwnerId: number) {
    this.editStoreOwnerMode = true;
    this.storeOwnerIdForEdit = storeOwnerId;
  }

  cancelAddStoreOwner(addStoreOwnerMode: boolean) {
    this.addStoreOwnerMode = addStoreOwnerMode;
  }

  cancelEditStoreOwner(editStoreOwnerMode: boolean) {
    this.editStoreOwnerMode = editStoreOwnerMode;
  }
}