import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { WebServiceService } from '../../services/web-service.service';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css'],
  // providers: [[WebServiceService], [HelperService] ]
})
export class ReferComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private webService: WebServiceService,
    private router: Router
  ) { }

  referralCode:any;

  ngOnInit() {
    //check if user already logged in
    var checkUser = this.helper.getFromStorage("hqbe@userid");
    if( !checkUser ) {
      this.router.navigateByUrl('/');
    }

    this.webService
      .getUser().subscribe((response:any) => {
        if (response.status == 1001) {
          this.helper.errorToast(response.message);
        } else if (response.status == 1000) {
          this.referralCode = response.data[0].referral_code;
        }
      });
  }

  copyToClipboard() {
    var textArea = document.createElement("textarea");
    textArea.value = this.referralCode;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      if( successful ) {
        this.helper.successToast('Code copied to your clipboard');
      } else {
        this.helper.errorToast('Not able to copy');
      }
    } catch (err) {
      this.helper.errorToast('Not able to copy');
    }
  
    document.body.removeChild(textArea);
  }

}
