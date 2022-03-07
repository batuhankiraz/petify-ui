import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../dto/register.dto';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }


  register(registerDto: RegisterDto): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/register', registerDto);
  }
}
