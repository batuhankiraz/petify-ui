import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../core/services/auth/auth.service';
import {LoginDto} from '../../../core/requests/login.dto';

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
    private toastrService: ToastrService) {
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
        if (params['activation'] !== undefined && params['activation'] === 'true') {
          this.toastrService.success('You have successfully finished your Petify Account Activation. Please sign-in');
        }
      });
  }


  login() {

    this.isError = false;
    this.loginDto.username = this.loginForm.get('username')?.value;
    this.loginDto.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginDto).subscribe(data => {
      if (data) {
        this.router.navigateByUrl('/');
        this.toastrService.success('Login Successful');
      } else {
        this.isError = true;
        console.log(this.isError)
      }
    });

  }

}
