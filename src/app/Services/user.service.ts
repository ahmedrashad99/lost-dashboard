import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';
import { UserForUpdateDTO } from '../Models/userForUpdateDTO';
// import { AuthService } from './auth.service';



// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.baseUrl;
  testObject: number;
  userForUpdateDTO: UserForUpdateDTO;

  constructor(private http: HttpClient) {}

  requestOptions = {
    headers: new HttpHeaders({Authorization: "Bearer " + localStorage.getItem('token')})
  };

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/get-all', this.requestOptions);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/get/' + id, this.requestOptions);
  }

  updateUser(id: number, uploadData: FormData) {
    return this.http.post(this.baseUrl + 'users/update/' + id, uploadData, this.requestOptions);
  }

  updateUserTest(id: number, userForUpdateDTO: UserForUpdateDTO) {
    return this.http.put("https://hookb.in/dmj9Vp6M7btxBzMxPLwq", userForUpdateDTO);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'users/delete/' + id, this.requestOptions);
  }

  addUser(uploadData: FormData) {
    return this.http.post(this.baseUrl + 'users/add', uploadData, this.requestOptions);
  }

  addUserTest(user: User) {
    return this.http.post("https://hookb.in/xYdJbw10eatbjgzB8BW7", user);
  }
}
