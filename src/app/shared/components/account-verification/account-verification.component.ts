import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert/alert.service";
import {RegisterService} from "../../../core/services/register/register.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.css']
})
export class AccountVerificationComponent implements OnInit {

  registerSuccessMessage!: string;
  verificationToken !: String
  accountVerificationForm !: FormGroup;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private registerService: RegisterService,
    private toastrService: ToastrService) {
    this.verificationToken = '';
  }


  ngOnInit(): void {

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params['registered'] !== undefined && params['registered'] === 'true') {
          this.registerSuccessMessage = 'Please check your mailbox for activate your account.';
          this.toastrService.success('Thank you for being a member to Petify. ' + this.registerSuccessMessage);
        }
      });

    this.accountVerificationForm = new FormGroup({
      verificationToken: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6)
        ])
    });

  }

  accountVerification() {
    this.verificationToken = this.accountVerificationForm.get('verificationToken')!.value;

    this.registerService.accountVerification(this.verificationToken).subscribe(() => {

        this.router.navigate(['/login'], {
          queryParams: {activation: 'true'}
        });
      },
      () => {
        this.toastrService.error('Invalid Verification Token! Please try again.');
      }
    )
  }
}
