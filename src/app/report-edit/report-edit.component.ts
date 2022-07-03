import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Report } from '../Models/report';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-report-edit',
  templateUrl: './report-edit.component.html',
  styleUrls: ['./report-edit.component.scss']
})
export class ReportEditComponent implements OnInit {

  @Input() reportIdForEdit: number;
  @Output() cancelEditReport = new EventEmitter();
  @ViewChild("reportEditForm") reportEditForm: NgForm;
  report: Report;
  types: any[];
  brands: any[];
  models: any[];
  colors: any[]
  RAM: any[];
  ROM: any[];
  convertedFile: any;

  constructor(private reportService: ReportService, private alertify: AlertifyService, private userService: UserService) { }

  ngOnInit() {
    this.types = this.alertify.Type();
    this.colors = this.alertify.Color();
    this.RAM = this.alertify.RAM();
    this.ROM = this.alertify.ROM();
    this.reportService.getReport(this.reportIdForEdit).subscribe((data: any) => {
      this.report = data.Data;
      this.brands = this.alertify.Brand().filter(e => e.id == this.report.type);
      this.models = this.alertify.Model().filter(e => e.id == this.report.brand);
    }, error => {
      this.alertify.error(error), 
      () => {};
    });
    

  }

  editReport() {
    const uploadData = new FormData();
    uploadData.append('serialNumber', this.report.serialNumber.toString());
    uploadData.append('type', this.report.type);
    uploadData.append('brand', this.report.brand);
    uploadData.append('model', this.report.model);
    uploadData.append('color', this.report.color);
    uploadData.append('RAM', this.report.RAM.toString());
    uploadData.append('ROM', this.report.ROM.toString());
    uploadData.append('frontCrach_top', this.statusWrite(this.report.frontCrach_top));
    uploadData.append('frontCrach_center', this.statusWrite(this.report.frontCrach_center));
    uploadData.append('frontCrach_bottom', this.statusWrite(this.report.frontCrach_bottom));
    uploadData.append('backCrach_top', this.statusWrite(this.report.backCrach_top));
    uploadData.append('backCrach_center', this.statusWrite(this.report.backCrach_center));
    uploadData.append('backCrach_bottom', this.statusWrite(this.report.backCrach_bottom));
    uploadData.append('additional_info', this.report.additional_info);
    uploadData.append('devicePicture', this.report.devicePicture);

    

    

      this.reportService.updateReport(this.report.reportID, uploadData).subscribe((response: any) => {
        if(response.status)
        {
          this.alertify.success(response.msg);
          window.location.reload();
        }
        else {
          this.alertify.error(response.msg);
        }
      }, error => {
        this.alertify.error('Internal error occurred!'),
        () => { };
      });
  }

  cancel() {
    this.cancelEditReport.emit(false);
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
  }
  onSelectBrand(model: any){
    this.models = this.alertify.Model()
    .filter(e=> 
     e.id == model.target.value);
  }
  onSelectModel(photo: any){
    let currentModel = this.models[0].items.filter((p: { id: any; }) => p.id == photo.target.value);
    let devicePhotoUrl = '../../assets/img/devices/' + this.report.type + '/' 
    + this.report.brand + '/' + currentModel[0].img;
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
      this.report.devicePicture = selectedFile;
    }










  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}