import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Report } from '../Models/report';
import { User } from '../Models/user';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-report-add',
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.scss']
})
export class ReportAddComponent implements OnInit {
  @Output() cancelAddReport = new EventEmitter();
  report: Report;
  reportForAdd: any;
  reportAddForm: FormGroup;
  users: User[];
  types: any[];
  brands: any[];
  models: any[];
  colors: any[];
  RAM: any[];
  ROM: any[];
  convertedFile: any;

  constructor(private reportService: ReportService, private router: Router, private fb: FormBuilder, private alertify: AlertifyService, 
              private userService: UserService) { }

  ngOnInit() {
    this.types = this.alertify.Type();
    this.brands = this.alertify.Brand();
    this.models = this.alertify.Model();
    this.colors = this.alertify.Color();
    this.RAM = this.alertify.RAM();
    this.ROM = this.alertify.ROM();
    

    this.userService.getUsers().subscribe((data:any) => { 
      this.users = data.Data;
      this.alertify.success(data.msg);
    }, error => { "Error retrieving users data!" });
    this.createAddReportForm();
    
  }

  createAddReportForm() {
    this.reportAddForm = this.fb.group({
      userID: ['', Validators.required],
      serialNumber: ['', Validators.required],
      type: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      RAM: ['', Validators.required],
      ROM: ['', Validators.required],
      frontCrach_top: [false, Validators.required],
      frontCrach_center: [false, Validators.required],
      frontCrach_bottom: [false, Validators.required],
      backCrach_top: [false, Validators.required],
      backCrach_center: [false, Validators.required],
      backCrach_bottom: [false, Validators.required],
      additional_info: ['', Validators.required],
      devicePicture: ['', Validators.required]
    });
  }
  // onChange(event:any){
  //   const selectedFile = event.target.files[0];
  //   this.reportAddForm.get('devicePicture')?.setValue(selectedFile);
  // }

  addReport() {
      const uploadData = new FormData();
      uploadData.append('userID', this.reportAddForm.get('userID')?.value);
      uploadData.append('serialNumber', this.reportAddForm.get('serialNumber')?.value);
      uploadData.append('type', this.reportAddForm.get('type')?.value);
      uploadData.append('brand', this.reportAddForm.get('brand')?.value);
      uploadData.append('model', this.reportAddForm.get('model')?.value);
      uploadData.append('color', this.reportAddForm.get('color')?.value);
      uploadData.append('RAM', this.reportAddForm.get('RAM')?.value);
      uploadData.append('ROM', this.reportAddForm.get('ROM')?.value);
      uploadData.append('frontCrach_top', this.statusWrite(this.reportAddForm.get('frontCrach_top')?.value));
      uploadData.append('frontCrach_center', this.statusWrite(this.reportAddForm.get('frontCrach_center')?.value));
      uploadData.append('frontCrach_bottom', this.statusWrite(this.reportAddForm.get('frontCrach_bottom')?.value));
      uploadData.append('backCrach_top', this.statusWrite(this.reportAddForm.get('backCrach_top')?.value));
      uploadData.append('backCrach_center', this.statusWrite(this.reportAddForm.get('backCrach_center')?.value));
      uploadData.append('backCrach_bottom', this.statusWrite(this.reportAddForm.get('backCrach_bottom')?.value));
      uploadData.append('additional_info', this.reportAddForm.get('additional_info')?.value);
      uploadData.append('devicePicture', this.reportAddForm.get('devicePicture')?.value);

      this.reportService.createReport(uploadData).subscribe((data:any) => {
        if(data.status){
          this.alertify.success(data.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(data.msg);
        }
       }, error => { this.alertify.error("There has been an error!") },
       () => { 
         
        }) 
  };

  cancel() {
    this.cancelAddReport.emit(false);
  }

  statusWrite(status: boolean) {
    if (status) {
      return '1';
    }
    else {
      return '0';
    }
  }

  onSelectType(brand: any){
    this.brands = this.alertify.Brand()
    .filter(e=>
     e.id == brand.target.value);
     console.log(this.brands);
  }
  onSelectBrand(model: any){
    this.models = this.alertify.Model()
    .filter(e=> 
     e.id == model.target.value);
     console.log(this.models);
  }
  onSelectModel(photo: any){
    let currentModel = this.models[0].items.filter((p: { id: any; }) => p.id == photo.target.value);;
    let devicePhotoUrl = '../../assets/img/devices/' + this.reportAddForm.get('type')?.value + '/' 
    + this.reportAddForm.get('brand')?.value + '/' + currentModel[0].img;
    // this.devicePhoto.src = devicePhotoUrl;
    // document.getElementById('imageTag')?.appendChild(this.devicePhoto);
    fetch(devicePhotoUrl)
            .then((e) => {
              return e.blob();
            })
            .then((blob) => {
              let b: any = blob;
              b.lastModifiedDate = new Date();
              b.name = currentModel[0].img;
              this.convertedFile = new File([b], b.name);
              this.devicePicture();
            });   
    }
    devicePicture(){
      const selectedFile = this.convertedFile;
      this.reportAddForm.get('devicePicture')?.setValue(selectedFile);
      console.log(selectedFile);
    }
}
