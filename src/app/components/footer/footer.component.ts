import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from '../../services/helper.service';
import { WebServiceService } from '../../services/web-service.service';
import { faLinkedin, faFacebook ,faTwitter,faPinterestP, faInstagram} from '@fortawesome/free-brands-svg-icons';


declare var $: any;
declare var feather:any;
//declare var grecaptcha:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faFacebook = faFacebook;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  faPinterestP = faPinterestP;
  faInstagram = faInstagram;
  constructor(
    private fb: FormBuilder,
    private webService: WebServiceService,
    private helper: HelperService,
  ) { }

  year = (new Date()).getFullYear();
  errors:any = [];
  btnCloseModal:any;
  successMsg: string = "";

  //Create contact Form
  contactForm = this.fb.group({
    destination: ["", [Validators.required ]],
    inDate : ["", [Validators.required, Validators.minLength(10)] ],
    quantityAdult : [ 1, [Validators.required, Validators.minLength(1), Validators.maxLength(15) ]],
    quantityChildren: [ 0, [Validators.minLength(0), Validators.maxLength(5)]],
    guestName: ["", [Validators.required ]],
    message: ["", [Validators.required ]],
    guestEmail: ["", [Validators.required, Validators.email ]],
    guestMobile: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]]
  });

  ngOnInit() {

  }

  showContact() {
    this.helper.showModal("showContact");
    this.successMsg = "";
    this.contactForm.reset();
    this.errors = [];
    var currentDate = new Date(new Date().getTime()+(1*24*60*60*1000));

    var datepicker = $( "#inDate" ).datepicker({
      dateFormat: "dd-mm-yy",
      dayNamesMin: ['S', 'M', 'T', 'W', 'TH', 'F', 'S'],
      showOtherMonths: true,
      changeMonth: true,
      changeYear: true,
      minDate: currentDate
    });
  }

  hideModal() {
    this.helper.hideModal('showContact');
    this.helper.hideModal('successOverlay');
  }

  submitForm() {
    var date = $('#inDate').val();
    this.contactForm.controls['inDate'].setValue(date);

    var dateObject = date.split("-");
    dateObject = new Date(dateObject[2], dateObject[1] - 1, dateObject[0]);
    this.errors = [];
    if( date == "" ) {
      this.errors.push("Check-in date is required.");
    }

    if( this.contactForm.controls.quantityAdult.errors ) {
      if(this.contactForm.controls.quantityAdult.errors.required) {
        this.errors.push("Number of adult is required.");
      } else if( this.contactForm.value.quantityAdult != parseInt(this.contactForm.value.quantityAdult) || this.contactForm.value.quantityAdult <= 0  ) {
        this.errors.push("Number of adult must be numeric only.");
      } 
    }

    if( this.contactForm.controls.quantityChildren.errors ) {
      if( this.contactForm.value.quantityChildren != parseInt(this.contactForm.value.quantityChildren) || this.contactForm.value.quantityChildren < 0  ) {
        this.errors.push("Number of children must be numeric only.");
      } 
    }

    if( this.contactForm.controls.guestName.errors ) {
      if(this.contactForm.controls.guestName.errors.required) {
        this.errors.push("Name is required.");
      }
    }

    if( this.contactForm.controls.guestEmail.errors ) {
      if(this.contactForm.controls.guestEmail.errors.required) {
        this.errors.push("Email is required.");
      } else if(this.contactForm.controls.guestEmail.errors.email) {
        this.errors.push("Email is invalid.");
      }
    }

    if( this.contactForm.controls.guestMobile.errors ) {
      if(this.contactForm.controls.guestMobile.errors.required) {
        this.errors.push("Mobile is required.");
      } else if( this.contactForm.value.guestMobile != parseInt(this.contactForm.value.guestMobile) ) {
        this.errors.push("Mobile must be numeric only.");
      } else if( this.contactForm.value.guestMobile != 10 ) {
        this.errors.push("Mobile number must be of 10 digits.");
      }
    }

    if( this.contactForm.controls.destination.errors ) {
      if(this.contactForm.controls.destination.errors.required) {
        this.errors.push("Location is required.");
      }
    }

    if( this.contactForm.controls.message.errors ) {
      if(this.contactForm.controls.message.errors.required) {
        this.errors.push("Message is required.");
      }
    }

    if( !this.errors.length ) {
      //submit form
      this.successMsg = "Your enquiry has been submitted. Our team will contact you shortly.";
      
    }


  }

}

