import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetSitterAdsComponent } from './pet-sitter-ads.component';

describe('PetSitterAdsComponent', () => {
  let component: PetSitterAdsComponent;
  let fixture: ComponentFixture<PetSitterAdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetSitterAdsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetSitterAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
