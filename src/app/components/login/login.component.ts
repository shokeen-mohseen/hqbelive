import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { WebServiceService } from '../../services/web-service.service';
import { Router } from '@angular/router';

declare var $: any;
declare const PhonePe: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [[WebServiceService], [HelperService] ]
})
export class LoginComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private webService: WebServiceService,
    private router: Router,
  ) { }
  loggedIn:boolean = false;
  errors:any = [];
  userMobile:any = "";
  userID:any = "";
  loginStep:number = 1;

  ngOnInit() {
    
    //check if user already logged in
    var checkUser = this.helper.getFromStorage("hqbe@userid");
    if( checkUser ) {
      this.router.navigateByUrl('/');
    }

  }

  checkMobile(mobile:any) {
    this.errors = [];
    this.userMobile = mobile;
    if(this.userMobile == "") {
      this.errors.push("Mobile is required.");
    } else if( this.userMobile != parseInt(this.userMobile) ) {
      this.errors.push("Mobile must be numeric only.");
    } else if( this.userMobile.length != 10 ) {
      this.errors.push("Guest mobile number must be of 10 digits.");
    } else {
      this.webService
      .mobileCheck(this.userMobile).subscribe((response:any) => {
        if (response.status == 1001) {
          this.errors.push(response.message);
        } else if (response.status == 1009) {
          this.userID = response.data.id;
          this.resendOTP();
          this.loginStep = 3;
        } else if (response.status == 1008) {
          this.loginStep = 2;
        }
      });
    }
  }

  createUser(name:any, email:any, referralCode:any) {
    this.errors = [];
    if(name == "") {
      this.errors.push("Name is required.");
    } else if(email == "") {
      this.errors.push("Email is required.");
    } //validation for valid email
    else {
      this.webService
      .createUser(name, email, this.userMobile, referralCode).subscribe((response:any) => {
        if (response.status == 1001 || response.status == 1010) {
          this.errors.push(response.message);
        } else if (response.status == 1002) {
          this.userID = response.data.id;
          this.resendOTP();
          this.loginStep = 3;
        }
      });

    }
  }

  resendOTP() {
    this.errors = [];
    
    this.webService
      .sendOTP(this.userID).subscribe((response:any) => {
        if (response.status == 1001) {
          this.errors.push(response.message);
        } else{
          //OTP has been sent
          this.helper.successToast('OTP has been sent on registered number.');
        }
      });
  }

  submitOTP(otp:any) {
    this.errors = [];
    
    this.webService
      .verifyOTP(this.userID, otp).subscribe((response:any) => {
        if (response.status == 1001) {
          this.errors.push(response.message);
        } else{
          localStorage.setItem('hqbe@userid',response.data.id);
          localStorage.setItem('hqbe@username',response.data.name);
          localStorage.setItem('hqbe@useremail',response.data.email);
          localStorage.setItem('hqbe@usermobile',response.data.mobile);
          window.location.href= "/";
        }
      });
  }

}
