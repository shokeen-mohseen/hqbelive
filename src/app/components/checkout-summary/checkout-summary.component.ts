import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { environment } from '../../../environments/environment';

declare var Razorpay: any;
declare const PhonePe: any;
declare var feather:any;
declare var $:any;

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class CheckoutSummaryComponent implements OnInit {

  title:string = "Checkout Summary";
  errors:any = [];
  cartItem:string = "";
  currentPackage: any;
  cartData: any;
  bookingTotal:any = "";
  bookingSubTotal:any = "";
  bookingNumber:any = "";
 
  couponList:any = [];
  couponCode:any = "";
  couponApplied:boolean = false;
  couponDiscount:any = "";

  phonePeFlag:any = "";
  phonePeSDK:any;
  phonePeReservationId:string = "";
  phonePeRedirect:string = "";

  paymentMode:string = "razorpay";

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    //Initialize Components

    if(this.helper.getFromStorage("booking") ) {
      this.helper.removeFromStorage("cart");
      this.helper.removeFromStorage("booking");
    }

    //Check Cart
    this.checkCart("booking");

    //Check for PhonePe
    var localPhonePe:any = window.localStorage.getItem('phonePeSDK');
    //var localPhonePe = JSON.parse(window.localStorage.getItem('phonePeSDK'));
    if( localPhonePe ) {
      this.phonePeFlag = "yes";
      this.phonePeSDK = localPhonePe.sdk;
    }
    //End Check for PhonePe

    setTimeout(() => {
      feather.replace();
    }, 0);
  }

  checkCart( type:any ) {
    //Clear error
    this.errors = [];
    var cartData = this.helper.getFromStorage("cart");
    this.cartItem = cartData.item;
    var payment_type = "";
    if(type=="payment") {
      if( this.phonePeFlag == "yes") {
        payment_type = "phonepe";
      } else {
        payment_type = this.paymentMode;
      }
    }
    

    this.couponApplied = false;
    this.couponDiscount = "";

    var finalItem:any = {};
    finalItem[this.cartItem] = cartData.quantity;
    this.webService.checkCart({
      "type": type,
      "item": JSON.stringify(finalItem),
      "restaurant" : cartData.restaurant,
      "guests": cartData.guests,
      "child_guests": cartData.child_guests,
      "guest_name": cartData.guest_name,
      "guest_email": cartData.guest_email,
      "guest_mobile": cartData.guest_mobile,
      "booking_date": cartData.booking_date,
      "payment_type": payment_type,
      "coupon" : this.couponCode,
    }).subscribe(
      (data:any) => {
        if(data.status==1006) {
          this.errors.push(data.message);
          this.couponCode = "";
          return;
        } else if(data.status != 1000) {
          this.errors.push(data.message);
          //this.router.navigateByUrl('checkout');
          return;
        }
        this.currentPackage = data.data.package[0]
        this.cartData = cartData;

        this.bookingNumber = data.data.booking_number;
        this.bookingTotal = data.data.final_total;
        this.bookingSubTotal = data.data.subtotal;

        this.couponList = data.data.coupon_list;

        if( Object.keys(data.data.coupon_info).length !== 0 ) {
          this.couponApplied = true;
          this.couponDiscount = data.data.coupon_info.discount;
          feather.replace();
        } else {
          this.couponCode = "";
        }

        if(type=="payment") {
          if(payment_type == "phonepe") {
            this.phonePeReservationId = data.data.payment.checksum;
            this.phonePeRedirect = data.data.payment.phonepe_redirect;
          }
          this.payNow(payment_type);
        }
      },
      error => this.errors = error
    );
  }

  removeCoupon() {
    this.couponCode = "";
    this.checkCart("booking");
  }
  
  applyCoupon(couponCode="") {
    if(couponCode !== "") {
      this.couponCode = couponCode;
    }

    this.helper.hideModal('showCoupons');

    this.checkCart("booking");
  }

  payNow( payment_type:any ) {
    this.errors = [];
    if(payment_type == "phonepe") {
      if(this.phonePeReservationId == "") {
        this.errors.push("error in placing your order. Please try again later.");
      }
      else {
        PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => { 
        sdk.proceedToPay(this.phonePeReservationId, '/verify-phonepe/' + this.phonePeRedirect)
        .then((response:any) => { 
          
          this.router.navigateByUrl('verify-phonepe/'+this.phonePeRedirect);
        }).catch((err:any) => {
          this.errors.push("Not able to process your payment at the moment, please try again later.");
          console.log(err);
        }) })
      }
    } else {
      if ( this.paymentMode == "razorpay") {
          this.bookingTotal = parseFloat(this.bookingTotal) * 100;
          var options:any = {
              "key": environment.razorpay_key,
              "amount": parseInt(this.bookingTotal), // 2000 paise = INR 20
              "name": "HQbe Web",
              "description": "Booking Number # "+this.bookingNumber,
              // "handler": function (response){
              //   alert("Transaction : "+response.razorpay_payment_id);
              //   this.verifyBooking(response.razorpay_payment_id, booking);
              //  },
              "prefill": {
                  "name":  this.cartData.guest_name,
                  "email": this.cartData.guest_email,
                  "contact": this.cartData.guest_mobile,
              },
              "notes": {  },
              "theme": {
                  "color": "blue"
              }
          };
          options.handler = ((response:any) => {
              this.verifyBooking(response.razorpay_payment_id, this.bookingNumber);
          });
          var rzp1 = new Razorpay(options);

          rzp1.open();
      }
      else if( this.paymentMode == "paytm") {
        window.location.href = environment.paytm_url + this.bookingNumber + "/drinks/2";
      }
    }
  }

  hideModal() {
    this.helper.hideModal('showCoupons');
  }

  showModal() {
    this.helper.showModal('showCoupons');
  }

  verifyBooking(transaction:any,booking:any) {
    this.webService.verifybooking(
        {
          transaction : transaction,
          booking_number : booking
        }
      )
      .subscribe( (response:any) => {
        if(response.status==1000)
        {
          //Success Transaction
          this.helper.setInStorage("booking", response.data.booking_number);
          this.router.navigateByUrl('booking-confirmation');
        }
        else{
          this.errors.push(response.message);
        }
    });
  }

  

}
