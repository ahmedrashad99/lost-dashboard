import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ReportAddComponent } from './report-add/report-add.component';
import { ReportsComponent } from './reports/reports.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreOwnerAddComponent } from './storeOwner-add/storeOwner-add.component';
import { StoreOwnersComponent } from './storeOwners/storeOwners.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from './Services/alertify.service';
import { UserService } from './Services/user.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './Services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './Guards/auth.guard';
import { ReportService } from './Services/report.service';
import { StoreOwnerService } from './Services/storeOwner.service';
import { ReviewService } from './Services/review.service';
import { ReviewAddComponent } from './review-add/review-add.component';
import { StoreOwnerEditComponent } from './storeOwner-edit/storeOwner-edit.component';
import { statusRead } from './Models/statusRead';
import { DashboardService } from './Services/dashboard.service';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import { hypenRemoverPipe } from './Models/hypenRemoverPipe';
// import { RevieweditComponent } from './review-edit/review-edit.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [	
    AppComponent,
    AdminTopbarComponent,
    DashboardMainComponent,
    SidebarComponent,
    LoginComponent,
    ReportsComponent,
    ReportAddComponent,
    StoreOwnersComponent,
    StoreOwnerAddComponent,
    StoreOwnerEditComponent,
    UserAddComponent,
    UsersComponent,
    UserEditComponent,
    ReviewsComponent,
    ReviewAddComponent,
    statusRead,
    ReviewEditComponent,
    ReportEditComponent,
    hypenRemoverPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [AlertifyService, UserService, AuthService, AuthGuard, ReportService, StoreOwnerService, ReviewService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

