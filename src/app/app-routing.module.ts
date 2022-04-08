import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './shared/components/login/login.component';
import {RegisterComponent} from './shared/components/register/register.component';
import {AccountComponent} from './shared/components/account/account.component';
import {AdvertiseComponent} from './shared/components/advertise/advertise.component';
import {HomepageComponent} from './shared/components/homepage/homepage.component';
import {AccountVerificationComponent} from "./shared/components/account-verification/account-verification.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'sign-up', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'advertise', component: AdvertiseComponent},
  {path: 'my-account', component: AccountComponent},
  {path: 'account-verification', component: AccountVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
