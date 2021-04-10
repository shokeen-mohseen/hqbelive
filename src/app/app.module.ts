import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { CategoryComponent } from './components/category/category.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutSummaryComponent } from './components/checkout-summary/checkout-summary.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PackageDetailComponent } from './components/package-detail/package-detail.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PhonepeLoginComponent } from './components/phonepe-login/phonepe-login.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReferComponent } from './components/refer/refer.component';
import { TermsComponent } from './components/terms/terms.component';
import { UserAgreementComponent } from './components/user-agreement/user-agreement.component';
import { VerifyPhonepeComponent } from './components/verify-phonepe/verify-phonepe.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Location, LocationStrategy, HashLocationStrategy} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingConfirmationComponent,
    BookingDetailsComponent,
    BookingHistoryComponent,
    CategoryComponent,
    CheckoutComponent,
    CheckoutSummaryComponent,
    FaqComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PackageDetailComponent,
    PackagesComponent,
    PhonepeLoginComponent,
    PrivacyComponent,
    ProfileComponent,
    ReferComponent,
    TermsComponent,
    UserAgreementComponent,
    VerifyPhonepeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
