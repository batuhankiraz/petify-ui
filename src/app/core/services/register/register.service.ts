import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../../requests/register.dto';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private register_url = environment.apiBaseUrl + '/register';
  private account_verification_url = environment.apiBaseUrl + '/register/account-verification'

  constructor(private httpClient: HttpClient) { }


  register(registerDto: RegisterDto): Observable<any> {

    return this.httpClient.post(this.register_url, registerDto);
  }

  accountVerification(verificationToken : String): Observable<any> {
    return this.httpClient.post(this.account_verification_url, verificationToken)
  }
}
