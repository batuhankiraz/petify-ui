import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '../../../core/requests/register.dto';
import { RegisterService } from '../../../core/services/register/register.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert/alert.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private password_regex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$";
  private date_regex = "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$";

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
        email: '',
        gender: '',
        address: '',
      };
   }

  ngOnInit(): void {
    this.registerForm = new FormGroup({

      firstName : new FormControl('',
        [
          Validators.required
        ]
      ),

      lastName : new FormControl('',
        [
          Validators.required
        ]
      ),

      email : new FormControl('',
        [
          Validators.required
        ]
      ),

      password: new FormControl('',
        [
          Validators.required,
          Validators.pattern(this.password_regex)
        ]
      ),

      phoneNumber : new FormControl('',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10)
        ]
      ),

      gender : new FormControl('',
        [
          Validators.required
        ]
      ),

      birthDate : new FormControl('',
        [
          Validators.required,
          Validators.pattern(this.date_regex)
        ]
      ),

      address : new FormControl('', [
          Validators.required,
          Validators.maxLength(255)
        ]
      )
    });
  }

  register() {

    this.registerDto.firstName = this.registerForm.get('firstName')!.value;
    this.registerDto.lastName = this.registerForm.get('lastName')!.value;
    this.registerDto.email = this.registerForm.get('email')!.value;
    this.registerDto.password = this.registerForm.get('password')!.value;
    this.registerDto.phoneNumber = this.registerForm.get('phoneNumber')!.value;
    this.registerDto.birthDate = this.registerForm.get('birthDate')!.value;
    this.registerDto.gender = this.registerForm.get('gender')!.value;
    this.registerDto.address = this.registerForm.get('address')!.value;

    this.registerService.register(this.registerDto).subscribe(() => {

      this.router.navigate(['/account-verification'], { queryParams: { registered: 'true' } });
    },
      () => {
      this.toastrService.error('Please try again.');
    });
  }

}
