import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators';
import { RegisterDto } from '../register/dto/register.dto';
import { LoginDto } from '../login/dto/login.dto';
import { LoginResponse } from '../login/response/login.response';
import { UserModel } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private register_url = environment.apiBaseUrl + '/register';
  private login_url = environment.apiBaseUrl + '/auth/login';
  private logout_url = environment.apiBaseUrl + '/auth/logout';
  private refresh_token_url = environment.apiBaseUrl + '/auth/refresh/token';
  private current_user_by_refresh_token_url = environment.apiBaseUrl + '/auth/current-user?refreshToken=';

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername()
  }

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService) {
  }


  register(registerDto: RegisterDto): Observable<any> {
    return this.httpClient.post(this.register_url, registerDto, { responseType: 'text' });
  }


  login(loginDto: LoginDto): Observable<boolean> {
    return this.httpClient.post<LoginResponse>(this.login_url, loginDto)
    .pipe(map(data => {
        
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        return true;
      }));
  }


  logout() {

    this.httpClient.post(this.logout_url, this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }


  refreshToken() {

    return this.httpClient.post<LoginResponse>(this.refresh_token_url, this.refreshTokenPayload)
    .pipe(tap(response => {

        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);

      }));
  }


  getCurrentUserFromRefreshToken(): Observable<UserModel>{
    
    return this.httpClient.get<any>(this.current_user_by_refresh_token_url + this.getRefreshToken());
  }


  getJwtToken() {
    
    return this.localStorage.retrieve('authenticationToken');
  }


  getRefreshToken() {
    
    return this.localStorage.retrieve('refreshToken');
  }


  getUsername() {
    
    return this.localStorage.retrieve('username');
  }


  getExpirationTime() {
    
    return this.localStorage.retrieve('expiresAt');
  }


  isLoggedInUser(): boolean{
    
    if(this.getJwtToken() != null){

      return true;
    }
    else{
      
      return false;
    }
  }


}