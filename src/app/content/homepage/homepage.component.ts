import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/service/auth.service';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentUser !: UserModel;

  constructor(
    private authService : AuthService) {

    }

  ngOnInit(): void {
    this.getCurrentUser();

  }

  getCurrentUser(){
    
    this.authService.getCurrentUserFromRefreshToken().subscribe(
      data => {
        console.log(data);
        this.currentUser = data;
      }
    );
  }

}
