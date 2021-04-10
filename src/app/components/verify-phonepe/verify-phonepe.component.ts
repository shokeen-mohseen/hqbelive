import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { environment } from '../../../environments/environment';

declare const PhonePe: any;

@Component({
  selector: 'app-verify-phonepe',
  templateUrl: './verify-phonepe.component.html',
  styleUrls: ['./verify-phonepe.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class VerifyPhonepeComponent implements OnInit {

  title:string = "Verify PhonePe";
  errorMsg:string = "";
  phonePeFlag:any = "";
  phonePeSDK:any;

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {

    //Initialize Components

    //Check for PhonePe
    var localPhonePe = this.helper.getFromStorage('phonePeSDK');
    if( localPhonePe ) {
      this.phonePeFlag = "yes";
      this.phonePeSDK = localPhonePe.sk;

      this.route.params.subscribe(params => { 
        this.webService.phonePeVerify(params['slug']).subscribe( (response:any) => {
          
          if(response.status == 1000 ) {
            this.helper.setInStorage("booking", response.data.booking_number);
            this.router.navigateByUrl('booking-confirmation');
          } else {
            this.errorMsg = "Not able to verify your payment."
          }
        });
      });
    } else {
      this.phonePeFlag = "no";
    }
    //End Check for PhonePe
  }
}
