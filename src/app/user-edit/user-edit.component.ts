import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { User } from 'src/app/Models/user';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';
import { UserForUpdateDTO } from '../Models/userForUpdateDTO';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input() userIdOfEdit: number;
  @Output() cancelEditUser = new EventEmitter();
  @ViewChild("userEditForm") userEditForm: NgForm;
  user: User;
  governments: any[];
  cities: any[];

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.user = data['user'];
    // })
    this.governmentInit();
    this.userService.getUser(this.userIdOfEdit).subscribe((data: any) => {
      this.user = data.Data;
      this.cities = this.alertify.city().filter(e=> e.id == data.Data.ContactInfo.government);
     }, error => {this.alertify.error(error), () => {};});
    
    
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  onChange(event:any){
    const selectedFile = event.target.files[0];
    this.user.avatar = selectedFile;
  }

  editUser() {
    const uploadData = new FormData();
    uploadData.append('firstName', this.user.firstName);
    uploadData.append('email', this.user.email);
    uploadData.append('lastName', this.user.lastName);
    uploadData.append('mobile_1', this.user.ContactInfo.mobile_1.toString());
    uploadData.append('mobile_2', this.user.ContactInfo.mobile_2.toString());
    uploadData.append('national_id', this.user.national_id);
    uploadData.append('avatar', this.user.avatar);
    uploadData.append('street', this.user.ContactInfo.street);
    uploadData.append('city', this.user.ContactInfo.city);
    uploadData.append('government', this.user.ContactInfo.government);
    uploadData.append('whatsapp', this.user.ContactInfo.whatsapp.toString());
    uploadData.append('facebookLink', this.user.ContactInfo.facebookLink);
    uploadData.append('password', this.user.password);
    uploadData.append('confirmPassword', this.user.confirmPassword);

      this.userService.updateUser(this.user.userID, uploadData).subscribe((response: any) => {
        this.alertify.success(response.msg);
        if(response.status) {
          this.alertify.success(response.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(response.msg);
        }
        this.userEditForm.reset(this.user);
      }, error => {
        this.alertify.error('Problem Updating Product!');
      }, () => {
        window.location.reload();
      }
      );
  }

  cancel() {
    this.cancelEditUser.emit(false);
  }
  governmentInit() {
    this.governments = this.alertify.Government();
  }

  onSelectGovernment(government: any){
    this.cities = this.alertify.city()
    .filter(e=> 
     e.id == government.target.value);
    
     this.user.ContactInfo.city = this.cities[0].name;
  }

  

}
