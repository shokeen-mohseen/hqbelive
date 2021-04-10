import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { WebServiceService } from '../../services/web-service.service';
import { Router } from '@angular/router';

declare const PhonePe: any;

@Component({
  selector: 'app-phonepe-login',
  templateUrl: './phonepe-login.component.html',
  styleUrls: ['./phonepe-login.component.css'],
  // providers: [[WebServiceService], [HelperService] ]
})
export class PhonepeLoginComponent implements OnInit {

  isPhonePe:boolean = false;

  constructor(
    private helper: HelperService,
    private webService: WebServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
    PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => {
      localStorage.setItem('phonePeSDK', JSON.stringify({ sdk: sdk, expiry: this.helper.getExpiry(new Date,1) }));
      this.isPhonePe = true;
      //Login Via PhonePe
      PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => {
        sdk.fetchAuthToken().then((res:any) => {
          this.phonePeLogin(res);
        }).catch((err:any) => {
          this.helper.errorToast("Not able to logged you in.")
          this.router.navigateByUrl("login");
        })
      }).catch((err:any)=>{
        this.helper.errorToast("Not able to logged you in.")
        this.router.navigateByUrl("login");
      })
    }).catch((err:any) => {
      console.log("PhonePe SDK not loaded")
      this.router.navigateByUrl("/");
      this.isPhonePe = false;
    });
  }

  /** PhonePe Login */
  phonePeLogin(grantToken:any) {
    this.webService
      .phonePeLogin(grantToken.grantToken).subscribe((response:any) => {
        if (response.status == 1001) {
          this.helper.errorToast(response.message)
          this.router.navigateByUrl("login");
        } else {
          this.helper.setInStorage('hqbe@userid',response.data.id);
          this.helper.setInStorage('hqbe@username',response.data.name);
          this.helper.setInStorage('hqbe@useremail',response.data.email);
          this.helper.setInStorage('hqbe@usermobile',response.data.mobile);

          this.router.navigateByUrl("/");
        }
      });
  }

}
