import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sessionExist !: boolean;
  username !: string;

  constructor(
    private authService : AuthService,
    private router: Router) {

     }

  ngOnInit(): void {
  
    this.sessionExist = this.isLoggedInUser();
    this.username = this.authService.getUsername();
  }


  isLoggedInUser() : boolean{
   
    return this.authService.isLoggedInUser();
  }


  logout(){
    
    this.authService.logout();
    this.sessionExist = false;
    window.location.reload();
    this.router.navigateByUrl('/');
  }
}
