import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../Services/alertify.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  role: string;
  model: any = {};

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Password or E-mail is incorrect!');
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }


  loggedIn() {
    if(this.authService.loggedIn())
    {
      return true;
    }
  }

  ngOnInit() {

  }

}

