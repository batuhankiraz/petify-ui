import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert/alert.service";
import {ToastrService} from "ngx-toastr";
import {AdvertiseService} from "../../../core/services/advertise/advertise.service";
import {AdvertiseDto} from "../../../core/requests/advertise.dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth/auth.service";

@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {

  private price_big_decimal_regex = "(0|[1-9]\\d*)?(\\.\\d+)?(?<=\\d)$";

  advertiseDto!: AdvertiseDto;
  advertiseForm!: FormGroup;

  constructor(
    private router: Router,
    private alertService: AlertService,
    private advertiseService: AdvertiseService,
    private toastrService: ToastrService,
    private authService: AuthService) {
    this.advertiseDto = {
      id: '',
      token: this.authService.getJwtToken(),
      title: '',
      description: '',
      price: '',
      country: '',
      city: '',
      town: '',
      petPreferences: ''
    };
  }

  ngOnInit(): void {


    /**
     *     - Advertise Form Validation's
     */
    this.advertiseForm = new FormGroup({

      title: new FormControl('',
        [
          Validators.required
        ]
      ),

      description: new FormControl('',
        [
          Validators.required
        ]
      ),

      price: new FormControl('',
        [
          Validators.required,
          Validators.pattern(this.price_big_decimal_regex)
        ]
      ),

      country: new FormControl('',
        [
          Validators.required
        ]
      ),

      city: new FormControl('',
        [
          Validators.required
        ]
      ),

      town: new FormControl('',
        [
          Validators.required
        ]
      ),

      petPreferences: new FormControl('',
        [
          Validators.required
        ]
      )

    });

  }

  advertise() {

    this.advertiseDto.title = this.advertiseForm.get('title')!.value;
    this.advertiseDto.description = this.advertiseForm.get('description')!.value;
    this.advertiseDto.price = this.advertiseForm.get('price')!.value;
    this.advertiseDto.country = this.advertiseForm.get('country')!.value;
    this.advertiseDto.city = this.advertiseForm.get('city')!.value;
    this.advertiseDto.town = this.advertiseForm.get('town')!.value;
    this.advertiseDto.petPreferences = this.advertiseForm.get('petPreferences')!.value;

    this.advertiseService.advertise(this.advertiseDto).subscribe(() => {
        this.router.navigate(
          ['/my-account'],
          {
            queryParams: {
              new_advertise: 'true'
            }
          });
      },
      () => {
        this.toastrService.error('Sorry. Something went wrong at the stage of your advert..');
      });
  }

}
