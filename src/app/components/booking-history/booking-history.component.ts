import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

declare var $: any;

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class BookingHistoryComponent implements OnInit {

  title:string = "Booking History";
  errors:any = [];
  bookingHistory:any;
  
  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    //Call web service
    this.webService.bookingHistory().subscribe(
      (data:any) => {
        if( data.status == 1000 ) {
          this.bookingHistory = data.data;
        } else {
          this.errors = [];
          this.errors.push(data.message);
        }

      },
      error => this.errors = error
    );
  }

}
