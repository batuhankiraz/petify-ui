import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from './dto/register.dto';
import { RegisterService } from './service/register.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerDto !: RegisterDto
  registerForm !: FormGroup;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private registerService: RegisterService,
    private toastrService: ToastrService) 
    {
    this.registerDto = {
      firstName: '',
      lastName: '',
      password: '',
      birthDate: '',
      phoneNumber: '',
      eMail: '',
      gender: 'Undefined',
      address: ''
    };
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName : new FormControl('', Validators.required),
      lastName : new FormControl('', Validators.required),
      eMail : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required),
      phoneNumber : new FormControl('', Validators.required),
      birthDate : new FormControl('', Validators.required),
      address : new FormControl('', Validators.required)
    });
  }

  register() {
    this.registerDto.firstName = this.registerForm.get('firstName')!.value;
    this.registerDto.lastName = this.registerForm.get('lastName')!.value;
    this.registerDto.eMail = this.registerForm.get('eMail')!.value;
    this.registerDto.password = this.registerForm.get('password')!.value;
    this.registerDto.phoneNumber = this.registerForm.get('phoneNumber')!.value;
    this.registerDto.birthDate = this.registerForm.get('birthDate')!.value;
    this.registerDto.address = this.registerForm.get('address')!.value;

    console.log(this.registerDto)
    this.registerService.register(this.registerDto).subscribe(() => {
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, () => {
      this.toastrService.error('Sign Up to Petify failed! Please try again');
    });
  }

}
