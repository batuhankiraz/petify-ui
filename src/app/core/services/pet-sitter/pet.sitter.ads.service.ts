import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdvertiseModel} from "../../models/advertise.model";

@Injectable({
  providedIn: 'root'
})
export class PetSitterAdsService {

  private pet_sitter_ads_url = environment.apiBaseUrl + '/advertise/all';

  constructor(private httpClient: HttpClient) {
  }


  getAllPetSitterAds(): Observable<AdvertiseModel[]> {

    return this.httpClient.get<AdvertiseModel[]>(this.pet_sitter_ads_url);
  }
}
