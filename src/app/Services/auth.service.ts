import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../Models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
    jwtHelper = new JwtHelperService();
    decodedToken: any;
constructor(private http: HttpClient) { }

baseUrl = 'http://127.0.0.1:8000/api/admin/';
userToken = this.jwtHelper.decodeToken(localStorage.getItem('token')!);


login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe( // 46
        map((response: any) => {
            const user = response;
            console.log(user.Data.token);
            if (user) {
                localStorage.setItem('token', user.Data.token);
                this.decodedToken = this.jwtHelper.decodeToken(user.Data.token);
                this.userToken = this.jwtHelper.decodeToken(localStorage.getItem('token')!);
            }
        })
    );
    
}
loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }


logout() {
    localStorage.removeItem('token');
    console.log('logged out');
}

register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
}

isVendor() {
    if (this.loggedIn())
    {
        if (this.userToken.role === 'True')
        {
            return true;
        }
            else
        {
            return false;
        }
    }
  }
}
