import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent implements OnInit {
  

  constructor(private authService: AuthService) { }

  validLogin() {
    if(this.authService.loggedIn() && !this.authService.expiredToken())
    {
      return true;
    }
  }

  ngOnInit() {
    
  }
}