import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';


declare var $: any;
declare var feather:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // providers: [WebServiceService]
})
export class HomeComponent implements OnInit {

  title:string = "Home";
  error:any= {};
  experienceCategory:any = [];
  experiencePackages:any = [];
  homeBottomBanners:any=[];
 
  constructor(
    private titleService: Title,
    private webService: WebServiceService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.webService.getPhonePeHome().subscribe(
      (data:any) => {
        this.experienceCategory = data.data.category;
        this.experiencePackages = data.data.packages;

        this.slider();
        //$('.home-hero-slider').not('.slick-initialized').slick();

      },
      error => this.error = error
    )
    this.webService.getHomeBottomBanners().subscribe(
      (data:any) => {debugger
       this.homeBottomBanners = data.data;
       setTimeout(() => {
         this.slider2()
       }, 50);
      },
      error => {debugger}
    )

    // $(document).ready(function(){
     
    //   $('.responsive').not('.slick-initialized').slick();
    // //   $('.responsive').not('.slick-initialized').slick({
    // //   dots: false,
    // //   infinite: false,
    // //   speed: 300,
    // //   slidesToShow: 2,
    // //   slidesToScroll: 2
    // // });
    // });
    
  }
  private slider2(){
    $('.home-bottom-slider figure').show();
    $('.home-bottom-slider').not('.slick-initialized').slick({
      autoplay:true,
      autoplaySpeed:2000,
      // pauseOnFocus: false,
      // pauseOnHover: false,
      // pauseOnDotsHover: false,
      dots: true,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });
  }

  private slider() {
    setTimeout(() => {
     
      feather.replace();
      if($('.home-hero-slider').length > 0) {
        $('.home-hero-slider figure').show();
       
        $(document).ready(function(){
                    function createSlick(){
                      $('.home-hero-slider').not('.slick-initialized').slick({
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                      });

                     
                        
                     
                     // $('.home-hero-slider').not('.slick-initialized').slick({arrows: false});
                    //  let a= $(".home-hero-slider").not('.slick-initialized').slick({
                    //     dots: true,
                    //     infinite: true,
                    //     variableWidth: true
                    //   });
                    //  let b =  $('.home-hero-slider').not('.slick-initialized').slick({arrows: false});
                    //     $('.slick-track').not('.slick-initialized').slick({
                    //       slidesToShow: 1,
                    //       slidesToScroll: 1,
                    //       dots: false,
                    //       infinite: true,
                    //       cssEase: 'linear'
                    //   });

                    }
                    createSlick();
                    
                    //Now it will not throw error
                    $(window).on( 'resize', createSlick);
          });
      }
      $(document).ready(function(){
        function createSlick2(){
         

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
        }
        createSlick2();
        
        //Now it will not throw error
        $(window).on( 'resize', createSlick2);
      });

    

    }, 0);
  }

}
