import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class BookingDetailsComponent implements OnInit {

  title:string = "Booking Detail";
  errors = [];
  bookingData:any;
  bookingPackage:any;

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      
      //Call web service
      this.webService.bookingDetails(params['booking']).subscribe(
      (data:any) => {
        if( data.status == 1000 ) {
          this.bookingData = data.data.booking;
          this.bookingPackage = data.data.package_info;
        }

      },
      error => this.errors = error
    );
      
    });

  }

}
