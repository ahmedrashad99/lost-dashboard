import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from '../Models/review';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';

@Injectable()
export class ReviewService {
    baseUrl = environment.baseUrl;

constructor(private http: HttpClient, private authService: AuthService) { }

requestOptions = {
    headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem('token')}),
  };

getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl + 'reviews/get-all', this.requestOptions);
}

getReview(reviewId: number) {
    return this.http.get(this.baseUrl + 'reviews/get/' + reviewId, this.requestOptions);
}

addReview(uploadData: FormData) {
    return this.http.post(this.baseUrl + 'reviews/add', uploadData, this.requestOptions);
}

editReview(id: number, uploadData: FormData) {
    return this.http.post(this.baseUrl + 'reviews/update/' + id, uploadData, this.requestOptions);
}

deleteReview(id: number) {
    return this.http.delete(this.baseUrl + 'reviews/delete/' + id, this.requestOptions);
}
}
