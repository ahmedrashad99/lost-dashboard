import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { AlertifyService } from 'src/app/Services/alertify.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  addUserMode: boolean = false;
  editUserMode: boolean = false;
  userIdForEdit: number;

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((data: any) => { this.users = data.Data;},
    error => {
      this.alertify.error(error);
    });
    
  }
  addUserToggle() {
    this.addUserMode = true;
  }
  editUserToggle(userId: number) {
    this.editUserMode = true;
    this.userIdForEdit = userId;
  }

  cancelAddUser(addUserMode: boolean) {
    this.addUserMode = addUserMode;
  }
  cancelEditUser(editUserMode: boolean) {
    this.editUserMode = editUserMode;
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe( () => { this.alertify.warning("User Deleted!"); },
    error => { this.alertify.error("An Error Occurred!"); },
    () => { window.location.reload(); } );
  }
  
}
