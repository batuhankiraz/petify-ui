import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { LoginDto } from './dto/login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;
  loginDto !: LoginDto;
  registerSuccessMessage!: string;
  isError!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) 
    {
      this.loginDto = {
        username: '',
        password: ''
    };
   }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params['registered'] !== undefined && params['registered'] === 'true') {
          this.registerSuccessMessage = 'Please check your mail for '
            + 'activate your Petify Account.';
          this.toastrService.success('Signup Successful. ' + this.registerSuccessMessage);
        }
      });
  }

  
  login(){

    this.isError = false;  
    this.loginDto.username = this.loginForm.get('username')?.value;
    this.loginDto.password = this.loginForm.get('password')?.value;
    
    this.authService.login(this.loginDto).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/');
        this.toastrService.success('Login Successful');
      } 
      else {
        this.isError = true;
        console.log(this.isError)
      }
    });

  }

}
