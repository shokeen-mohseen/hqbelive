import { Component,OnInit  } from '@angular/core';
declare const $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor() {
    // Called first time before the ngOnInit()
 }

  ngOnInit() {
    $(document).ready(function(){
      $("button").click(function(){
        $("p").html("Hello <b>world?</b>");
      });
      $('.responsive').not('.slick-initialized').slick();
    //   $('.responsive').not('.slick-initialized').slick({
    //   dots: false,
    //   infinite: false,
    //   speed: 300,
    //   slidesToShow: 2,
    //   slidesToScroll: 2
    // });
    });
 }
}
