import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Report } from '../Models/report';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
    'Content-Type': 'application/json',
    accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.baseUrl;



constructor(private http: HttpClient) { }

requestOptions = {
    headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem('token')}),
  };

getReports(): Observable<Report[]> {
  return this.http.get<Report[]>(this.baseUrl + 'reports/get-all', this.requestOptions);
}

getReport(id: number): Observable<Report> {
  return this.http.get<Report>(this.baseUrl + 'reports/get/' + id, this.requestOptions);
}

updateReport(id: number, uploadData: FormData) {
  return this.http.post(this.baseUrl + 'reports/update/' + id, uploadData, this.requestOptions);
}

createReport(uploadData: FormData) {
  return this.http.post(this.baseUrl + 'reports/add', uploadData, this.requestOptions);
}

deleteReport(id: number) {
  return this.http.delete(this.baseUrl + 'reports/delete/' + id, this.requestOptions);
}

}
  