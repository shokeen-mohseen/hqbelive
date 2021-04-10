import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { WebServiceService } from '../../services/web-service.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // providers: [[WebServiceService], [HelperService] ]
})
export class ProfileComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private webService: WebServiceService,
    private router: Router,
  ) { }

  errors:any = [];
  loggedIn:boolean = false;
  userName:string = "";
  userEmail:string = "";
  userMobile:any;

  ngOnInit() {
    //check if user already logged in
    var checkUser = this.helper.getFromStorage("hqbe@userid");
    if( !checkUser ) {
      this.router.navigateByUrl('/');
    }

    this.userName = this.helper.getFromStorage("hqbe@username");
    this.userEmail = this.helper.getFromStorage("hqbe@useremail");
    this.userMobile = this.helper.getFromStorage("hqbe@usermobile");
  }

  updateDetails() {
    this.errors = [];
    if(this.userMobile == "") {
      this.errors.push("Mobile is required.");
    } else if( this.userMobile != parseInt(this.userMobile) ) {
      this.errors.push("Mobile must be numeric only.");
    } else if( this.userName == "") {
      this.errors.push("Please enter name.");
    } else if( this.userEmail == "") {
      this.errors.push("Please enter email.");
    } else {
      this.webService
      .updateUser(this.userName, this.userEmail, this.userMobile).subscribe((response:any) => {
        if (response.status == 1001) {
          this.errors.push(response.message);
        } else if (response.status == 1000) {
          alert(response.message);
        }
      });
    }
  }

}
