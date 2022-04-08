import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UpdateProfileDto} from "../../requests/update.profile.dto";

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  private update_profile_url = environment.apiBaseUrl + '/my-account/update-profile';

  constructor(private httpClient: HttpClient) {
  }

  updateProfile(updateProfileDto: UpdateProfileDto) {

    return this.httpClient.post(this.update_profile_url, updateProfileDto);
  }
}
