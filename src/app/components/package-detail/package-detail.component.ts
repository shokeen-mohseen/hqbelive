import { Component, OnInit } from '@angular/core';
import { WebServiceService } from '../../services/web-service.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
declare var feather:any;

@Component({
  selector: 'app-package-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.css'],
  // providers: [ [WebServiceService], [HelperService] ]
})
export class PackageDetailComponent implements OnInit {

  title:string = "Package";
  error:any= {};
  currentPackage:any = [];
  packageGallery:any = [];
  featuredPackages:any = [];
  isPhonePe:boolean = false;
  btnCloseModal:any;
 
  constructor(
    private modalService: NgbModal,
    private titleService: Title,
    private webService: WebServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: HelperService,
  ) { }
  
  open(content:any) {
    let options: any = {
      size: "dialog-centered",
      windowClass: 'myCustomModalClass'
    };
    this.modalService.open(content, options).result.then((result) => {
    let a= `Closed with: ${result}`;
    }, (reason) => {
      
     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    setInterval(()=>{
      $('.hqbe-product-img-slider').not('.slick-initialized').slick({
        autoplay:true,
        autoplaySpeed:2000,
        pauseOnFocus: false,
        pauseOnHover: false,
        pauseOnDotsHover: false,
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
     
      // $('.hqbe-product-img-slider').not('.slick-initialized').slick({
      //     infinite: false,
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //     dots: true
      // });
    },100)

  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
 
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      
      this.webService.getPhonePePackageDetail(params['slug']).subscribe(
        (data:any) => {
          this.currentPackage = data.data.package;
          this.packageGallery = data.data.gallery;
          this.featuredPackages = data.data.featured;

          if( this.featuredPackages.length ) {
            this.slider();
          }
          //if(this.packageGallery) {
            setTimeout(() => {
              
                
                $('a[data-hqbe-modal]').click((e:any)=> {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  var $item = $(this);
                  var aa=$item.data('hqbe-modal');
                 // var $modal = $('#'+$item.data('hqbe-modal'));
                  var $modal = $('#photo-gallery-overlay');
                  this.btnCloseModal = $('.hqbe-modal__btn-close', $modal);
                  
                  $('body').addClass('menu--open').delay(150).css({ 'overflow': 'hidden' });
                  $modal.addClass('open');
                  
                  this.btnCloseModal.on('click', (e:any)=> {
                    e.preventDefault();
                    e.stopPropagation();
                    $('body').removeClass('menu--open').delay(150).css({ 'overflow': 'visible' });
                    $modal.removeClass('open');
                  });
                  
                });


            }, 0);
          //}
        },
        error => this.error = error
      );
    });

    //check for PhonePe
    var localPhonePe:any = localStorage.getItem('phonePeSDK');
    //var localPhonePe = JSON.parse(localStorage.getItem('phonePeSDK'));
    if( localPhonePe ) {
      this.isPhonePe = true;
    } else {
      console.log("no phonePe SDK")
    }
  }

  private slider() {
    setTimeout(() => {
      feather.replace();
      if($('#sticky-sidebar-pdetail').length > 0) {
        $('#sticky-sidebar-pdetail').stickySidebar({
          topSpacing: 130,
          bottomSpacing: 80,
          containerSelector: '.page-sections',
          innerWrapperSelector: '.sidebar__inner',
          minWidth: 992
        });
      }  
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



    }, 0);
  }

  addToCart() {
    if( !this.currentPackage.slug ) {
      this.helper.errorToast("please wait");
      return;
    }
    this.helper.removeFromStorage("cart");
    this.helper.removeFromStorage("booking");
    this.helper.setInStorage("cart", { "item" : "P"+this.currentPackage.id,
                                        "item_slug" : this.currentPackage.slug,
                                        "restaurant": this.currentPackage.restaurant_id,
                                        "end_date": this.currentPackage.end_date 
                                      })

    //window.location.href= "/checkout";
    this.router.navigateByUrl('checkout');
  }

}
