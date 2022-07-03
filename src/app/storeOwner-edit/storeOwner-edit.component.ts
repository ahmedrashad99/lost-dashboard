import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { StoreOwner } from 'src/app/Models/storeOwner';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { StoreOwnerService } from 'src/app/Services/storeOwner.service';
import { StoreOwnerForUpdateDTO } from '../Models/storeOwnerForUpdateDTO';

@Component({
  selector: 'app-storeOwner-edit',
  templateUrl: './storeOwner-edit.component.html',
  styleUrls: ['./storeOwner-edit.component.scss']
})
export class StoreOwnerEditComponent implements OnInit {
  @Input() storeOwnerIdOfEdit: number;
  @Output() cancelEditStoreOwner = new EventEmitter();
  @ViewChild("storeOwnerEditForm") storeOwnerEditForm: NgForm;
  storeOwner: StoreOwner;
  governments: any[];
  cities: any[];

  constructor(private storeOwnerService: StoreOwnerService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.governments = this.alertify.Government();
    this.storeOwnerService.getStoreOwner(this.storeOwnerIdOfEdit).subscribe((data: any) => {
      this.storeOwner = data.Data;
      this.cities = this.alertify.city().filter(e => e.id == this.storeOwner.Store.government);
      
      
    }, error => {
      this.alertify.error(error),
      () => { };
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.storeOwner.avatar = selectedFile;
  }

  editStoreOwner() {
    const uploadData = new FormData();
    uploadData.append('firstName', this.storeOwner.firstName);
    uploadData.append('email', this.storeOwner.email);
    uploadData.append('lastName', this.storeOwner.lastName);
    uploadData.append('mobile', this.storeOwner.mobile.toString());
    uploadData.append('storeMobile_1', this.storeOwner.Store.storeMobile_1.toString());
    uploadData.append('storeMobile_2', this.storeOwner.Store.storeMobile_1.toString());
    uploadData.append('avatar', this.storeOwner.avatar);
    uploadData.append('storeName', this.storeOwner.Store.storeName);
    uploadData.append('street', this.storeOwner.Store.street);
    uploadData.append('government', this.storeOwner.Store.government);
    uploadData.append('city', this.storeOwner.Store.city);
    uploadData.append('whatsapp', this.storeOwner.Store.whatsapp.toString());
    uploadData.append('facebookLink', this.storeOwner.Store.facebookLink);
    uploadData.append('password', this.storeOwner.password);
    uploadData.append('confirmPassword', this.storeOwner.confirmPassword);

      this.storeOwnerService.updateStoreOwner(this.storeOwner.ownerID, uploadData).subscribe((response: any) => {
        if(response.status){
          this.alertify.success(response.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(response.msg);
        }
      }, error => {
        this.alertify.error('Problem Updating Product!');
      },
        () => { });
  }

  cancel() {
    this.cancelEditStoreOwner.emit(false);
  }

  onSelectGovernment(government: any){
    this.cities = this.alertify.city()
    .filter(e=>
     e.id == government.target.value);

    //  this.storeOwner.Store.city = this.cities[0].name;
  }

}
