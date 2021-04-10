import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  serverURL = environment.api_url;
  constructor(
    private http: HttpClient,
    private helper: HelperService,
  ) { }

  getPhonePeHome() {
    return this.http.get( this.serverURL + "/phonepehome" ).pipe(
      //catchError(this.handleError)
    );
  }
  getHomeBottomBanners() {
    return this.http.get( this.serverURL + "/banners" ).pipe(
      //catchError(this.handleError)
    );
  }

  getPhonePeCategory(slug:any) {
    return this.http.post( this.serverURL + "/phonepecategory/", { slug: slug } ).pipe(
      //catchError(this.handleError)
    );
  }

  getPhonePePackages(top:any, category="", location="") {
    return this.http.post( this.serverURL + "/phonepepackages/", { top: top, category: category, location: location } ).pipe(
      //catchError(this.handleError)
    );
  }

  getPhonePePackageDetail(slug:any) {
    return this.http.post( this.serverURL + "/phonepepackagedetail/", { slug: slug } ).pipe(
      //catchError(this.handleError)
    );
  }

  phonePeLogin(token:any) {
    return this.http.post(this.serverURL + '/phonePeLogin', {grantToken : token}).pipe(
      //catchError(this.handleError)
    );
  }

  mobileCheck(mobile:any) {
    return this.http.post(this.serverURL + '/mobileCheck', {mobile : mobile}).pipe(
      //catchError(this.handleError)
    );
  }

  createUser(name:any, email:any, mobile:any, referralCode:any) {
    return this.http.post(this.serverURL + '/createUser', {name : name, email : email, mobile : mobile, referral_code: referralCode }).pipe(
      //catchError(this.handleError)
    );
  }

  sendOTP(user:any) {
    return this.http.post(this.serverURL + '/sendactivationotp', {userid : user}).pipe(
      //catchError(this.handleError)
    );
  }

  verifyOTP(user:any, otp:any) {
    return this.http.post(this.serverURL + '/verifyactivationotp', {userid : user, otp: otp}).pipe(
      //catchError(this.handleError)
    );
  }

  phonePeVerify(token:any) {
    return this.http.post(this.serverURL + '/phonePeVerify', {grantToken : token}).pipe(
      //catchError(this.handleError)
    );
  }

  checkCart(data:any) {

    var userid = this.helper.getFromStorage('hqbe@userid');
    if (!userid) {
      var booking_type = "guest";
      userid = "";
    } else {
      var booking_type = "self";
    }
    return this.http.post( this.serverURL + "/cart/", { 
      userid : userid, 
      restaurant : data.restaurant,
      packages : data.item,
      liquor: "",
      starter: "",
      booking_type: booking_type,
      type: data.type,
      guests: data.guests,
      child_guests: data.child_guests,
      guest_name: data.guest_name,
      guest_email: data.guest_email,
      guest_mobile: data.guest_mobile,
      booking_date: data.booking_date,
      coupon: data.coupon,
      booking_time: "ts",
      // special_request: data.special_request,
      // request_type: data.request_type,
      // booking_comment: data.booking_comment,
      // coupon: data.coupon,
      payment_type: data.payment_type
     } ).pipe(
      //catchError(this.handleError)
    );
  }

  verifybooking(data:any) {
    return this.http.post( this.serverURL + "/verifybooking/", { transaction : data.transaction, booking : data.booking_number } ).pipe(
      //catchError(this.handleError)
    );
  }

  bookingDetails(bookingNumber:any) {
    return this.http.post( this.serverURL + "/bookingdetails/", { booking : bookingNumber, userid : this.helper.getFromStorage('hqbe@userid') } ).pipe(
      //catchError(this.handleError)
    );
  }

  bookingHistory() {
    return this.http.post( this.serverURL + "/bookinghistory/", { userid : this.helper.getFromStorage('hqbe@userid') } ).pipe(
      //catchError(this.handleError)
    );
  }

  updateUser(name:any, email:any, mobile:any) {
    return this.http.post( this.serverURL + "/updateUser/", { name : name, email: email, mobile:mobile, user : this.helper.getFromStorage('hqbe@userid') } ).pipe(
      //catchError(this.handleError)
    );
  }

  getUser() {
    return this.http.post( this.serverURL + "/userinfo/", { userid : this.helper.getFromStorage('hqbe@userid') } ).pipe(
      //catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error Received from Service")
    console.log(HttpErrorResponse);

    return throwError( {"error":"Error in service"} );
  }

}

