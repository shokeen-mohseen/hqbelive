import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var feather:any;

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css'],
  // providers: [WebServiceService]
})
export class PackagesComponent implements OnInit {

  title:string = "Experience Packages";
  error:any= {};
  experienceCategory:any = [];
  experiencePackages:any = [];

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.webService.getPhonePePackages(params['top'], params['category'], params['location']).subscribe(
        (data:any) => {
          this.experienceCategory = data.data.category;
          this.experiencePackages = data.data.packages;
          
          if(this.experiencePackages) {
            setTimeout(() => {
                this.slider();
            }, 0);
          }
        },
        error => this.error = error
      );
    });
  }

  private slider() {
    setTimeout(() => {
      feather.replace();
      
    }, 0);
  }

}
