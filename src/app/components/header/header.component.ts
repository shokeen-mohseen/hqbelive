import { Component, OnInit } from '@angular/core';

import { HelperService } from './../../services/helper.service';
import { WebServiceService } from './../../services/web-service.service';
import { Router } from '@angular/router';

declare var $: any;
declare var feather:any;
declare const PhonePe: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private helper: HelperService,
    private webService: WebServiceService,
    private router: Router,
  ) { }
  loggedIn:boolean = false;
  userName:string = "";
  isPhonePe:boolean = false;

  loadWindow() {
    if($('.link-btn__book').length > 0) {
      $('.site-footer').css({'padding-bottom': '60px'});
    }
  }

  scrollWindow = () => {
    var header = $('.site-header');
    if(header.length > 0) {
      if ($(window).scrollTop() > 80) {
        header.addClass('sticky');
      } else {
        header.removeClass('sticky');
      }
    }

    if($('.link-btn__book').length > 0) {
      var bookButton = $('.link-btn__book');
      if ($(window).scrollTop() > (parseInt($('.link-btn__checkout').offset().top) - 50)) { 
        bookButton.addClass('reveal'); 
      } else { 
        bookButton.removeClass('reveal'); 
      }
    }
  }

  ngOnInit() {
    //check for PhonePe
    var localPhonePe = this.helper.getFromStorage(('phonePeSDK'));
    if( localPhonePe ) {
      this.isPhonePe = true;
    } else {
      //try to load PhonePe SDK
      PhonePe.PhonePe.build(PhonePe.Constants.Species.web).then((sdk:any) => {
        console.log("loading PhonePe SDK")
        localStorage.setItem('phonePeSDK', JSON.stringify({ sdk: sdk, expiry: this.helper.getExpiry(new Date,1) }));
        this.isPhonePe = true;
      }).catch((err:any) => {
        console.log("PhonePe SDK not loaded")
        this.isPhonePe = false;
      });
    }

    var checkUser = this.helper.getFromStorage("hqbe@userid");
    if( checkUser ) {
      this.loggedIn = true;
      this.userName = this.helper.getFromStorage("hqbe@username")
    }

    //Initialize JQuery Components
    setTimeout(() => {
      feather.replace();

      this.loadWindow();
      $(window).scroll(this.scrollWindow);

      //JS For Menu Toggle
      // Handle Mobile Navigation
      var sideNav = $('.side-nav');
      sideNav.append($('.site-navigation').clone());
      $('.menu-toggle, .menu-close').click(function(e:any) {
        e.preventDefault();
        e.stopPropagation();
        $('.side-nav').toggleClass('side-nav--open');
      })

      if($('#sticky-sidebar').length > 0) {
        $('#sticky-sidebar').stickySidebar({
          topSpacing: 130,
          bottomSpacing: 80,
          containerSelector: '.page-sections',
          innerWrapperSelector: '.sidebar__inner',
          minWidth: 992
        });
      }

    }, 0);
  }

  logout() {
    this.helper.removeFromStorage('hqbe@userid');
    this.helper.removeFromStorage('hqbe@username');
    this.helper.removeFromStorage('hqbe@useremail');
    this.helper.removeFromStorage('hqbe@usermobile');
    this.loggedIn = false;
    console.log("logging out")
    if(navigator.userAgent.match(/Android/i))
    {
      console.log("redirecting for android");
      location.assign('/')
    }
    else
      window.location.replace("/");
  }
}

