import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdvertiseDto} from "../../requests/advertise.dto";

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

  private advertise_url = environment.apiBaseUrl + '/advertise/add-advertise';

  constructor(private httpClient: HttpClient) { }


  advertise(advertiseDto: AdvertiseDto): Observable<any> {

    return this.httpClient.post(this.advertise_url, advertiseDto);
  }
}
