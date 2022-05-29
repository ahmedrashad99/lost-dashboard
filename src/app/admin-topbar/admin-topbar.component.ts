import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-admin-topbar',
  templateUrl: './admin-topbar.component.html',
  styleUrls: ['./admin-topbar.component.scss']
})
export class AdminTopbarComponent implements OnInit {
  

  constructor(private authService: AuthService) { }

  loggedIn() {
    if(this.authService.loggedIn())
    {
      return true;
    }
  }

  ngOnInit() {
    
  }
}