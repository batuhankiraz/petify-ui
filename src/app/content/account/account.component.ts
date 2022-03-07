import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user!: UserModel;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUserInformations();
    this.user;
    console.log(this.user);
  }

  getCurrentUserInformations() {
   
    this.authService.getCurrentUserFromRefreshToken().subscribe(
      (data: UserModel)=> {
        this.user = data;
      }
    );
  }
}
