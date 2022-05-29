import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../Models/report';
import { StoreOwner } from '../Models/storeOwner';
import { StoreOwnerForAdd } from '../Models/storeOwnerForAdd';
import { StoreOwnerForUpdateDTO } from '../Models/storeOwnerForUpdateDTO';
import { AuthService } from './auth.service';

@Injectable()
export class StoreOwnerService {
    baseUrl = environment.baseUrl;
    

constructor(private http: HttpClient, private authService: AuthService) { }

requestOptions = {
    headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem('token')}),
  };

  

getStoreOwners(): Observable<StoreOwner[]> {
    return this.http.get<StoreOwner[]>(this.baseUrl + 'owners/get-all', this.requestOptions);
}

getStoreOwner(id: number): Observable<StoreOwner> {
    return this.http.get<StoreOwner>(this.baseUrl + 'owners/get/' + id, this.requestOptions);
}

deleteStoreOwner(id: number) {
    return this.http.delete(this.baseUrl + 'owners/delete/' + id, this.requestOptions);
}

addStoreOwner(uploadData: FormData) {
    return this.http.post(this.baseUrl + 'owners/add', uploadData, this.requestOptions);
}

updateStoreOwner(id: number, uploadData: FormData) {
    return this.http.post(this.baseUrl + 'owners/update/' + id, uploadData, this.requestOptions);
}

addStoreOwnerTest(storeOwner: StoreOwnerForAdd) {
    return this.http.post('https://hookb.in/xYq1go69dkS0BYZ0Jg0w', storeOwner);
}

getMyStoreOwnerReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl + 'StoreOwners/StoreOwnerReportss/' + this.authService.userToken.nameid);
}

getStoreOwnerAndReviewsCount(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'owners/reviewsCount', this.requestOptions);
}

}
