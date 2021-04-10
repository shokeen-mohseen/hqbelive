import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

declare var $: any;
declare var feather:any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
  // providers: [WebServiceService]
})
export class CategoryComponent implements OnInit {
  
  title:string = "Category";
  category:string="";
  error:any= {};
  experienceCategory:any = [];
  topPackages:any = [];
  locationPackages:any = [];

  constructor(
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['slug'];
      this.webService.getPhonePeCategory(this.category).subscribe(
        (data:any) => {
          this.experienceCategory = data.data.category;
          this.topPackages = data.data.top_packages;
          this.locationPackages = data.data.location_packages;
          
          if(this.topPackages || this.locationPackages) {
           
            setTimeout(() => {
                this.slider();
            }, 0);
          }
        },
        error => this.error = error
      );
    });
  }

  getLocationDescription(description:any) {
    return description.substr(0,200)+"...";
  }

  private slider() {
    setTimeout(() => {
      feather.replace();

      
     
      $('.package-list__slider').not('.slick-initialized').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 820,
            settings: {
              dots: false,
              arrows: false,
              infinite: false,
              speed: 300,
              slidesToShow: 2,
              slidesToScroll: 2,
              variableWidth: true,
              draggable: true,
              swipeToSlide: true,
              touchMove: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              dots: false,
              arrows: false,
              infinite: false,
              speed: 300,
              slidesToShow: 1.35,
              slidesToScroll: 1,
              variableWidth: false,
              draggable: true,
              swipeToSlide: true,
              touchMove: true
            }
          },
          {
            breakpoint: 360,
            settings: {
              dots: false,
              arrows: false,
              infinite: false,
              speed: 300,
              slidesToShow: 1.2,
              slidesToScroll: 1,
              variableWidth: false,
              draggable: true,
              swipeToSlide: true,
              touchMove: true
            }
          }
        ]
      });
     
      // $('.home-hero-slider').not('.slick-initialized').slick({
      //   autoplay:true,
      //   autoplaySpeed:2000,
      //   // pauseOnFocus: false,
      //   // pauseOnHover: false,
      //   // pauseOnDotsHover: false,
      //   dots: true,
      //   infinite: false,
      //   speed: 300,
      //   slidesToShow: 1,
      //   slidesToScroll: 1,
      //   fade: true,
      //   cssEase: 'linear',
      //   responsive: [
      //     {
      //       breakpoint: 1024,
      //       settings: {
      //         slidesToShow: 1,
      //         slidesToScroll: 1,
      //         infinite: true,
      //         dots: true
      //       }
      //     },
      //     {
      //       breakpoint: 600,
      //       settings: {
      //         slidesToShow: 1,
      //         slidesToScroll: 1
      //       }
      //     },
      //     {
      //       breakpoint: 480,
      //       settings: {
      //         slidesToShow: 1,
      //         slidesToScroll: 1
      //       }
      //     }
      //     // You can unslick at a given breakpoint now by adding:
      //     // settings: "unslick"
      //     // instead of a settings object
      //   ]
      // });

    }, 0);
  }

}
