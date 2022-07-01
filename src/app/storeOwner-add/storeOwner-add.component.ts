import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreOwner } from '../Models/storeOwner';
import { StoreOwnerForAdd } from '../Models/storeOwnerForAdd';
import { AlertifyService } from '../Services/alertify.service';
import { StoreOwnerService } from '../Services/storeOwner.service';

@Component({
  selector: 'app-storeOwner-add',
  templateUrl: './storeOwner-add.component.html',
  styleUrls: ['./storeOwner-add.component.scss']
})
export class StoreOwnerAddComponent implements OnInit {
  @Output() cancelAddStoreOwner = new EventEmitter();
  
  storeOwner: StoreOwner;
  storeOwnerAddForm: FormGroup;
  storeOwnerForAdd: StoreOwnerForAdd;
  governments: any[];
  cities: any[];

  constructor(private storeOwnerService: StoreOwnerService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.governments = this.alertify.Government();
    this.cities = this.alertify.city();

    this.createAddStoreOwnerForm();
  }

  createAddStoreOwnerForm() {
    this.storeOwnerAddForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      avatar: [''],
      storeMobile_1: ['', Validators.required],
      storeMobile_2: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      government: ['', Validators.required],
      storeName: ['', Validators.required],
      whatsapp: ['', Validators.required],
      facebookLink: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.storeOwnerAddForm.get('avatar')?.setValue(selectedFile);
  }

  addStoreOwner() {
    if(this.storeOwnerAddForm.valid) {

    }
    const uploadData = new FormData();
      uploadData.append('email', this.storeOwnerAddForm.get('email')?.value);
      uploadData.append('firstName', this.storeOwnerAddForm.get('firstName')?.value);
      uploadData.append('lastName', this.storeOwnerAddForm.get('lastName')?.value);
      uploadData.append('mobile', this.storeOwnerAddForm.get('mobile')?.value);
      uploadData.append('storeMobile_1', this.storeOwnerAddForm.get('storeMobile_1')?.value);
      uploadData.append('storeMobile_2', this.storeOwnerAddForm.get('storeMobile_2')?.value);
      uploadData.append('avatar', this.storeOwnerAddForm.get('avatar')?.value);
      uploadData.append('street', this.storeOwnerAddForm.get('street')?.value);
      uploadData.append('storeName', this.storeOwnerAddForm.get('storeName')?.value);
      uploadData.append('city', this.storeOwnerAddForm.get('city')?.value);
      uploadData.append('government', this.storeOwnerAddForm.get('government')?.value);
      uploadData.append('addressNotes', this.storeOwnerAddForm.get('addressNotes')?.value);
      uploadData.append('whatsapp', this.storeOwnerAddForm.get('whatsapp')?.value);
      uploadData.append('facebookLink', this.storeOwnerAddForm.get('facebookLink')?.value);
      uploadData.append('password', this.storeOwnerAddForm.get('password')?.value);
      uploadData.append('confirmPassword', this.storeOwnerAddForm.get('confirmPassword')?.value);

    this.storeOwnerService.addStoreOwner(uploadData).subscribe((response:any) => { 
      if(response.status) {
        this.alertify.success(response.msg);
        window.location.reload();
      }
      else {
        this.alertify.error(response.msg);
      }
    },
      error => this.alertify.error(error),
      () => { });
  }
  

  cancel() {
    this.cancelAddStoreOwner.emit(false);
  }

  onSelectGovernment(government: any){
    this.cities = this.alertify.city()
    .filter(e=> 
     e.id == government.target.value);
  }

  
}
