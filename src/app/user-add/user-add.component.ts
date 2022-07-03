import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @Output() cancelAddUser = new EventEmitter();
  user: User;
  userAddForm: FormGroup;
  file: File;
  status: any;
  governments: any[] = [{ id:"Select Government", items: [{id: ""}] }];
  cities: any[] = [{ id:"Select City", items: [{id: ""}] }];

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAddUserForm();
    this.governmentInit();
  }

  createAddUserForm() {
    this.userAddForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile_1: ['', Validators.required],
      mobile_2: ['', Validators.required],
      national_id: ['', Validators.required],
      avatar: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      government: ['', Validators.required],
      addressNotes: ['', Validators.required],
      whatsapp: ['', Validators.required],
      facebookLink: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  onChange(event:any){
    // this.file = event.target.files[0];
    // this.userAddForm.patchValue({avatar: this.file});
    // console.log(this.file);
    // console.log(this.userAddForm.get('avatar'));
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.userAddForm.get('avatar')?.setValue(event.target.files[0]);
    // };
    // reader.readAsDataURL(event.target.files[0]);
    const selectedFile = event.target.files[0];
    this.userAddForm.get('avatar')?.setValue(selectedFile);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  addUser() {
      const uploadData = new FormData();
      uploadData.append('email', this.userAddForm.get('email')?.value);
      uploadData.append('firstName', this.userAddForm.get('firstName')?.value);
      uploadData.append('lastName', this.userAddForm.get('lastName')?.value);
      uploadData.append('mobile_1', this.userAddForm.get('mobile_1')?.value);
      uploadData.append('mobile_2', this.userAddForm.get('mobile_2')?.value);
      uploadData.append('national_id', this.userAddForm.get('national_id')?.value);
      uploadData.append('avatar', this.userAddForm.get('avatar')?.value);
      uploadData.append('street', this.userAddForm.get('street')?.value);
      uploadData.append('city', this.userAddForm.get('city')?.value);
      uploadData.append('government', this.userAddForm.get('government')?.value);
      uploadData.append('addressNotes', this.userAddForm.get('addressNotes')?.value);
      uploadData.append('whatsapp', this.userAddForm.get('whatsapp')?.value);
      uploadData.append('facebookLink', this.userAddForm.get('facebookLink')?.value);
      uploadData.append('password', this.userAddForm.get('password')?.value);
      uploadData.append('confirmPassword', this.userAddForm.get('confirmPassword')?.value);
      
      this.userService.addUser(uploadData).subscribe((response:any) => {
        if(response.status) {
          this.alertify.success(response.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(response.msg);
        }
        console.log(this.status.status);
      });
    
  }

  cancel() {
    this.cancelAddUser.emit(false);
  }
  
  governmentInit() {
    this.governments = this.alertify.Government();
  }

  onSelectGovernment(government: any){
    this.cities = this.alertify.city()
    .filter(e=> 
     e.id == government.target.value);
  }


}
