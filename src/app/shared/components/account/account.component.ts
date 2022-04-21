import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from 'src/app/core/services/auth/auth.service';
import {UserModel} from 'src/app/core/models/user.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateProfileService} from "../../../core/services/update-profile/update-profile.service";
import {UpdateProfileDto} from "../../../core/requests/update.profile.dto";
import {NgbInputDatepickerConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  private date_regex = "^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|((1)[0-2]))(\\/)\\d{4}$";
  private email_regex = "[^ @]*@[^ @]";

  user!: UserModel;
  updateProfileDto!: UpdateProfileDto;
  updateProfileForm!: FormGroup;
  datePickerModel: any;

  constructor(
    private authService: AuthService,
    private updateProfileService: UpdateProfileService,
    private config: NgbInputDatepickerConfig) {

    this.updateProfileDto = {
      firstName: '',
      lastName: '',
      birthDate: '',
      phoneNumber: '',
      eMail: '',
      gender: '',
      address: '',
      token: this.authService.getJwtToken()
    };

    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
    config.autoClose = 'outside';
    config.placement = ['top-start', 'top-end'];
  }

  ngOnInit(): void {

    /**
     *     - Current User Information's
     */
    this.getCurrentUserInformations();
    this.user;


    /**
     *     - Update Profile Form Validation's
     */
    this.updateProfileForm = new FormGroup({

      firstName: new FormControl('',
        [
          Validators.required
        ]
      ),

      lastName: new FormControl('',
        [
          Validators.required
        ]
      ),

      eMail: new FormControl('',
        [
          Validators.required,
          Validators.pattern(this.email_regex)
        ]
      ),

      phoneNumber: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11)
        ]
      ),

      gender: new FormControl('',
        [
          Validators.required
        ]
      ),

      birthDate: new FormControl('',
        [
          Validators.required
        ]
      ),

      address: new FormControl('', [
          Validators.required,
          Validators.maxLength(255)
        ]
      )
    });

  }

  getCurrentUserInformations() {

    this.authService.getCurrentUserFromSession().subscribe(
      (data: UserModel) => {
        this.user = data;
      }
    );
  }

  updateProfile() {
    this.updateProfileDto.firstName = this.updateProfileForm.get('firstName')!.value;
    this.updateProfileDto.lastName = this.updateProfileForm.get('lastName')!.value;
    this.updateProfileDto.eMail = this.updateProfileForm.get('eMail')!.value;
    this.updateProfileDto.phoneNumber = this.updateProfileForm.get('phoneNumber')!.value;
    this.updateProfileDto.gender = this.updateProfileForm.get('gender')!.value;
    this.updateProfileDto.birthDate = this.updateProfileForm.get('birthDate')!.value;
    this.updateProfileDto.address = this.updateProfileForm.get('address')!.value;

    this.updateProfileService.updateProfile(this.updateProfileDto).subscribe(() => {

    });
  }
}
