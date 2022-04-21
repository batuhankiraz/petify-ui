import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AdvertiseModel} from "../../../core/models/advertise.model";
import {PetSitterAdsService} from "../../../core/services/pet-sitter/pet.sitter.ads.service";

@Component({
  selector: 'app-pet-sitter-ads',
  templateUrl: './pet-sitter-ads.component.html',
  styleUrls: ['./pet-sitter-ads.component.css']
})
export class PetSitterAdsComponent implements OnInit {

  petSitterAds!: AdvertiseModel[];

  constructor(
    private petSitterAdsService : PetSitterAdsService
  ) {}

  ngOnInit(): void {

    this.getAllPetSitterAds();
    console.log(this.petSitterAds);

  }

  test() {
    console.log('Works...')
  }

  getAllPetSitterAds() {

    return this.petSitterAdsService.getAllPetSitterAds().subscribe(
      (data: AdvertiseModel[]) => {
        this.petSitterAds = data;
      }
    );
  }

}
