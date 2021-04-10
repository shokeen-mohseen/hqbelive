import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { FormBuilder, Validators } from '@angular/forms';

declare var $: any;
declare const PhonePe: any;
declare var feather:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class CheckoutComponent implements OnInit {
  title:string = "Checkout";
  errors:any = [];
  cartItem:string = "";
  cartData: any;
  currentPackage: any;
  phonePeSDK:number = 0;

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
    private fb: FormBuilder
  ) { }

  async loadPhonePeSDK() {
    var localPhonePe:any = localStorage.getItem('phonePeSDK');
    //var localPhonePe = JSON.parse(localStorage.getItem('phonePeSDK'));
    var sdk = localPhonePe.sdk;
    var checkMobile = this.helper.getFromStorage('hqbe@usermobile');
    if( !checkMobile ) {
      //Login Via PhonePe
      PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => {
        sdk.fetchAuthToken().then((res:any) => {
          this.phonePeLogin(res);
        }).catch((err:any) => {
          this.helper.errorToast("You are not loggedin, Checking out as guest.");
          this.checkCart("cart");
        })
      })
    }
  }

  //Create Cart Form
  cartForm = this.fb.group({
    checkInDate : ["", [Validators.required, Validators.minLength(10)] ],
    quantityAdult : [ 1, [Validators.required, Validators.minLength(1), Validators.maxLength(15) ]],
    quantityChildren: [ 0, [Validators.minLength(0), Validators.maxLength(5)]],
    guestName: ["", [Validators.required ]],
    guestEmail: ["", [Validators.required, Validators.email ]],
    guestMobile: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
  });
  
  ngOnInit() {
    
    //Initialize Components
    this.loadDatePicker();
    if(this.helper.getFromStorage("booking") ) {
      this.helper.removeFromStorage("cart");
      this.helper.removeFromStorage("booking");
    }

    //Populate date from Storage into Form
    this.cartData = this.helper.getFromStorage("cart");
    if( this.cartData.child_guests ) {
      this.cartForm.controls['quantityChildren'].setValue(this.cartData.child_guests);
    }
    if( this.cartData.guest_name ) {
      this.cartForm.controls['guestName'].setValue(this.cartData.guest_name);
    } else {
      var checkName = this.helper.getFromStorage('hqbe@username');
      if( checkName) {
        this.cartForm.controls['guestName'].setValue(checkName);
      }
      
    }
    if( this.cartData.guest_email ) {
      this.cartForm.controls['guestEmail'].setValue(this.cartData.guest_email);
    } else {
      var checkEmail = this.helper.getFromStorage('hqbe@useremail');
      if( checkEmail) {
        this.cartForm.controls['guestEmail'].setValue(checkEmail);
      }
    }
    if( this.cartData.guest_mobile ) {
      this.cartForm.controls['guestMobile'].setValue(this.cartData.guest_mobile);
    }else {
      var checkMobile = this.helper.getFromStorage('hqbe@usermobile');
      if( checkMobile) {
        this.cartForm.controls['guestMobile'].setValue(checkMobile);
      }
    }
    if( this.cartData.booking_date ) {
      this.cartForm.controls['checkInDate'].setValue(this.cartData.booking_date);
    }
    if( this.cartData.quantity ) {
      this.cartForm.controls['quantityAdult'].setValue(this.cartData.quantity);
    }
    //Check Cart
    this.checkCart("cart");
    var localPhonePe:any =  localStorage.getItem('phonePeSDK');
    //Check for PhonePeSDK
    //var localPhonePe = JSON.parse(localStorage.getItem('phonePeSDK'));
    var getExpiry = this.helper.getExpiry(new Date, 0);
    if( !localPhonePe || !localPhonePe.hasOwnProperty('sdk')  || !localPhonePe.hasOwnProperty('expiry') || getExpiry >= localPhonePe.expiry ) {
      //remove old storage
      localStorage.removeItem('phonePeSDK');
      //request to load SDK
      PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => {
        //set SDK storage
        localStorage.setItem('phonePeSDK', JSON.stringify({ sdk: sdk, expiry: this.helper.getExpiry(new Date,1) }));
        this.phonePeSDK = 1;
        this.loadPhonePeSDK();

      }).catch((err:any) => {
        //console.log("Error occurred while loading sdk: " + err)
        this.phonePeSDK = 2;
      })
    } else {
      this.phonePeSDK = 1;
      this.loadPhonePeSDK();
    }
  }

  loadDatePicker() {
    var currentDate = new Date(new Date().getTime()+(1*24*60*60*1000));
    console.log("length : "+$("#checkInDate").length);
    if( $("#checkInDate").length ) {
      console.log("check-in date");
      var datepicker = $( "#checkInDate" ).datepicker({
        dateFormat: "dd-mm-yy",
        dayNamesMin: ['S', 'M', 'T', 'W', 'TH', 'F', 'S'],
        showOtherMonths: true,
        changeMonth: true,
        changeYear: true,
        minDate: currentDate
      });
    }
    

    // console.log(currentDate);

  }

  checkCart( type:any ) {
    //Clear error
    this.errors = [];

    var cartData = this.helper.getFromStorage("cart");
    this.cartItem = cartData.item;

    var numberOfGuest = this.cartForm.value.quantityChildren > 0 ? this.cartForm.value.quantityChildren : this.cartForm.value.quantityAdult;
    var finalItem:any = {};
    finalItem[this.cartItem] = this.cartForm.value.quantityAdult;
    this.webService.checkCart({
      "type": type,
      "item": JSON.stringify(finalItem),
      "restaurant" : cartData.restaurant,
      "guests": numberOfGuest,
      "child_guests": this.cartForm.value.quantityChildren,
      "guest_name": this.cartForm.value.guestName,
      "guest_email": this.cartForm.value.guestEmail,
      "guest_mobile": this.cartForm.value.guestMobile,
      "booking_date": this.cartForm.value.checkInDate,
      "payment_type" : "",
    }).subscribe(
      (data:any) => {

        if(data.status != 1000) {
          this.errors.push(data.message);
        }

        if( type == "booking" && data.status != 1000) {
          return;
        }

        this.currentPackage = data.data.package[0];

        if( type == "booking") {
          //Save date to Local Storage
          this.helper.setInStorage("cart", { "item" : "P"+this.currentPackage.id,
                                          "quantity": this.cartForm.value.quantityAdult,
                                          "guests": numberOfGuest,
                                          "child_guests": this.cartForm.value.quantityChildren,
                                          "guest_name": this.cartForm.value.guestName,
                                          "guest_email": this.cartForm.value.guestEmail,
                                          "guest_mobile": this.cartForm.value.guestMobile,
                                          "booking_date": this.cartForm.value.checkInDate,
                                          "restaurant": cartData.restaurant,
                                          "item_slug": cartData.item_slug,
                                          "end_date": this.currentPackage.end_date
                                      })
          //Redirect to Summary
          this.router.navigateByUrl('checkout-summary');
        }

        setTimeout(() => {
          feather.replace()
        },0);
        
      },
      error => this.errors = error
    );
  }

  onSubmit() {
    //set date from jQuery datepicker to cartForm
    
    var date = $('#checkInDate').val();
    this.cartForm.controls['checkInDate'].setValue(date);

    var dateObject = date.split("-");
    dateObject = new Date(dateObject[2], dateObject[1] - 1, dateObject[0]);
    this.errors = [];
    if( date == "" ) {
      this.errors.push("Check-in date is required.");
    } else if ( dateObject.getTime() > new Date(this.cartData.end_date).getTime() ) {
      this.errors.push("You cannot book after "+this.cartData.end_date);
    }
    
    if( this.cartForm.controls.quantityAdult.errors ) {
      if(this.cartForm.controls.quantityAdult.errors.required) {
        this.errors.push("Number of adult is required.");
      } else if( this.cartForm.value.quantityAdult != parseInt(this.cartForm.value.quantityAdult) || this.cartForm.value.quantityAdult <= 0  ) {
        this.errors.push("Number of adult must be numeric only.");
      } 
    }

    if( this.cartForm.controls.quantityChildren.errors ) {
      if( this.cartForm.value.quantityChildren != parseInt(this.cartForm.value.quantityChildren) || this.cartForm.value.quantityChildren < 0  ) {
        this.errors.push("Number of children must be numeric only.");
      } 
    }

    if( this.cartForm.controls.guestName.errors ) {
      if(this.cartForm.controls.guestName.errors.required) {
        this.errors.push("Guest name is required.");
      }
    }

    if( this.cartForm.controls.guestEmail.errors ) {
      if(this.cartForm.controls.guestEmail.errors.required) {
        this.errors.push("Guest email is required.");
      } else if(this.cartForm.controls.guestEmail.errors.email) {
        this.errors.push("Guest email is invalid.");
      }
    }

    if( this.cartForm.controls.guestMobile.errors ) {
      if(this.cartForm.controls.guestMobile.errors.required) {
        this.errors.push("Guest mobile is required.");
      } else if( this.cartForm.value.guestMobile != parseInt(this.cartForm.value.guestMobile) ) {
        this.errors.push("Guest mobile must be numeric only.");
      } else if( this.cartForm.value.guestMobile.length != 10 ) {
        this.errors.push("Guest mobile number must be of 10 digits.");
      }
    }

    if( !this.errors.length ) {
      this.checkCart("booking");
    }

  }

  /** PhonePe Login */
  phonePeLogin(grantToken:any) {
    this.webService
      .phonePeLogin(grantToken.grantToken).subscribe((response:any) => {
        if (response.status == 1001) {
          this.errors = response.message;
        } else {
          localStorage.setItem('hqbe@userid',response.data.id);
          localStorage.setItem('hqbe@username',response.data.name);
          localStorage.setItem('hqbe@useremail',response.data.email);
          localStorage.setItem('hqbe@usermobile',response.data.mobile);

          this.cartForm.controls['guestName'].setValue(response.data.name);
          this.cartForm.controls['guestEmail'].setValue(response.data.email);
          this.cartForm.controls['guestMobile'].setValue(response.data.mobile);


          this.checkCart("cart");
        }
        
      });
  }
}
