import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Report } from '../Models/report';
import { AlertifyService } from '../Services/alertify.service';
import { ReportService } from '../Services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  addReportMode: boolean = false;
  reports: Report[];
  editReportMode: boolean;
  reportIdForEdit: number;

  constructor(private reportService: ReportService, private alertify: AlertifyService) { }
  

  ngOnInit() {
    this.reportService.getReports().subscribe((data:any) => {
      this.reports = data.Data;
      this.alertify.success(data.msg);
    }, error => {
      this.alertify.error("Error retrieving reports!");
    });
  }
  
  addReportToggle() {
    this.addReportMode = true;
  }
  
  editReportToggle(reportIdForEdit: number) {
    this.reportIdForEdit = reportIdForEdit;
    this.editReportMode = true;
  }
  deleteReport(reportID: number) {
    this.reportService.deleteReport(reportID).subscribe((response:any) => {
      if(response.status) {
        this.alertify.success(response.msg);
        window.location.reload();
      }
      else {
        this.alertify.error(response.msg); 
      }
    })
  }

  cancelAddReport(addReportMode: boolean) {
    this.addReportMode = addReportMode;
  }

  cancelEditReport(editReportMode: boolean) {
    this.editReportMode = editReportMode;
  }

}
