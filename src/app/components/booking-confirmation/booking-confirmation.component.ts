import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class BookingConfirmationComponent implements OnInit {

  title:string = "Checkout Summary";
  errors = [];
  cartItem:string = "";
  currentPackage: any;
  cartData: any;
  bookingNumber:any = "";
  isPhonePe:boolean = false;
  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    //Initialize Components
    this.bookingNumber = this.helper.getFromStorage("booking");

    //check for PhonePe
    var localPhonePe = this.helper.getFromStorage('phonePeSDK');
    if( localPhonePe ) {
      this.isPhonePe = true;
    }

    //Call web service
    this.webService.bookingDetails(this.bookingNumber).subscribe(
      (data:any) => {
        if( data.status == 1000 ) {
          this.cartData = data.data.booking;
          this.currentPackage = data.data.package_info;
        }

        if($('#sticky-sidebar').length > 0) {
          $('#sticky-sidebar').stickySidebar({
            topSpacing: 130,
            bottomSpacing: 80,
            containerSelector: '.page-sections',
            innerWrapperSelector: '.sidebar__inner',
            minWidth: 992
          });
        }

        if(this.helper.getFromStorage("booking") ) {
          this.helper.removeFromStorage("cart");
          this.helper.removeFromStorage("booking");
        }
      },
      error => this.errors = error
    );

  }

}
