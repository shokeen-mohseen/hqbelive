import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const subfolder = "";
const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'home', component: HomeComponent  },
  { path: subfolder+'category/:slug', component: CategoryComponent  },
  { path: subfolder+'packages/:top', component: PackagesComponent  },
  { path: subfolder+'packages/:top/:category', component: PackagesComponent  },
  { path: subfolder+'packages/:top/:category/:location', component: PackagesComponent  },
  { path: subfolder+'package-detail/:slug', component: PackageDetailComponent  },
  { path: subfolder+'checkout', component: CheckoutComponent  },
  { path: subfolder+'checkout-summary', component: CheckoutSummaryComponent  },
  { path: subfolder+'booking-confirmation', component: BookingConfirmationComponent  },
  { path: subfolder+'verify-phonepe/:slug', component: VerifyPhonepeComponent  },
  { path: subfolder+'login', component: LoginComponent  },
  { path: subfolder+'faq', component: FaqComponent  },
  { path: subfolder+'terms', component: TermsComponent  },
  { path: subfolder+'privacy', component: PrivacyComponent  },
  { path: subfolder+'user-agreement', component: UserAgreementComponent  },
  { path: subfolder+'booking-history', component: BookingHistoryComponent  },
  { path: subfolder+'booking-detail/:booking', component: BookingDetailsComponent  },
  { path: subfolder+'user-profile', component: ProfileComponent  },
  { path: subfolder+'refer-n-earn', component: ReferComponent  },
  { path: subfolder+'phonepe-login', component: PhonepeLoginComponent  },
  { path: subfolder+'booking/:booking', component: BookingComponent  },
  { path: 'cart', redirectTo: 'checkout', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
