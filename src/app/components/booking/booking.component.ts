import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class BookingComponent implements OnInit {

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.helper.setInStorage("booking", params['booking']);
        this.router.navigateByUrl('booking-confirmation');
    });
  }

}
