import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {LoginComponent} from './shared/components/login/login.component';
import {RegisterComponent} from './shared/components/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AlertService} from './core/services/alert/alert.service';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FooterComponent} from './shared/footer/footer.component';
import {HomepageComponent} from './shared/components/homepage/homepage.component';
import {AdvertiseComponent} from './shared/components/advertise/advertise.component';
import {AccountComponent} from './shared/components/account/account.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AccountVerificationComponent} from './shared/components/account-verification/account-verification.component';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TokenInterceptor} from "./core/interceptors/token.interceptor";
import {NetworkInterceptor} from "./core/interceptors/network.interceptor";
import {PetSitterAdsComponent} from "./shared/components/pet-sitter-ads/pet-sitter-ads.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HomepageComponent,
    AdvertiseComponent,
    AccountComponent,
    AccountVerificationComponent,
    PetSitterAdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatTabsModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    FormsModule,
    NgbModule,
  ],
  providers: [
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
