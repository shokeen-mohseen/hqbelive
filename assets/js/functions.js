var $ = jQuery;
var emailfilter = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
var hash;
scrollOffset = -60;
scrollOffsetMobile = 0;

var packagesJsonList = {
    "JimCorbett" : [
      {"packageID" : 0,"packageName" : "2N/ 3D Stay and Safari", "propertyType": ["Budget Property", "Premium Property", "Luxury Property"]}
    ],
    "BirBilling" : 
    [
      {"packageID" : 0,"packageName" : "1N/ 2D Camping n Paragliding", "propertyType": ["Executive Camp", "Cottages", "Swiss Camp"]},
      {"packageID" : 1,"packageName" : "2N/ 3D Camping n Paragliding", "propertyType": ["Executive Camp", "Cottages", "Swiss Camp"]}
    ],
    "Rishikesh" : 
    [
      {"packageID" : 0,"packageName" : "1N/ 2D Camping", "propertyType": ["Alpine Camp", "Swiss Camp"]},
      {"packageID" : 1,"packageName" : "1N/ 2D Camping n Rafting", "propertyType": ["Swiss Camp"]},
      {"packageID" : 2,"packageName" : "2N/ 3D Camping n Rafting", "propertyType": ["Swiss Camp Site", "Luxury Camp Site"]}
    ],
    "Mussoorie" : 
    [
      {"packageID" : 0,"packageName" : "2N/ 3D Camping @ Kanatal", "propertyType": ["Premium Camp Site"]},
      {"packageID" : 1,"packageName" : "2N/ 3D Camping @ Chakrata", "propertyType": ["Premium Camp Site"]},
      {"packageID" : 2,"packageName" : "2N/ 3D Camping @ Mussoorie", "propertyType": ["Premium Camp Site"]}
    ],
    "Nainital" : 
    [
      {"packageID" : 0,"packageName" : "1N/ 2D Camping n Paragliding @ NaukuchiaTal", "propertyType": ["Alpine Camps", "Swiss Camp", "Luxury Cottage"]},
      {"packageID" : 1,"packageName" : "2N/ 3D Camping n Paragliding @ NaukuchiaTal", "propertyType": ["Alpine Camps", "Swiss Camp", "Luxury Cottage"]}
    ],
    "New Tehri" : 
    [
      {"packageID" : 0,"packageName" : "2N/ 3D Stay n Adventure @ Tehri", "propertyType": ["Premium Cottage"]}
    ]
};


( function( $ ) {
  $.fn.equalizeHeights = function(){
    return this.height( Math.max.apply(this, $(this).map(function(i,e){return $(e).height()}).get() ) )
  }
  
  var showLoading = function() {
    $('#page').append('<div class="spinner__wrapper"><div class="spinner"></div></div>');
  }
  var hideLoading = function() {
    if($('.spinner__wrapper').length > 0) $('.spinner__wrapper').remove();
  }
  
  function scrollToElement(selector, time, verticalOffset, callback) {
    time = typeof(time) != 'undefined' ? time : 500;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    t = ($(window).scrollTop() - offsetTop);
    if (t <= 0) t *= -1
    t = parseInt(t * .5);
    if (t < time) t=time
    if (t > 1500) t=1500
    $('html, body').animate({
      scrollTop: offsetTop
    }, t, 'easeInOutCirc', callback);
  }
  
  
  function showRequest(formData, jqForm, options) {
    var isValid = true;
    var $alert = $('.form-submit-errors', jqForm);
    $alert.removeClass('success error');
    $alert.hide();
    
    $('.has-error', jqForm).removeClass('has-error');
    $('.field-input.required', jqForm).each(function() {
      var $item = $(this);
      
      if($item.val().replace(/^\s*|\s*$/g,"")=="") {
        if($item.hasClass('hidden') || $item.parents('.hidden').length > 0) {
          //do not validate as this field is hidden
        } else {
          $item.addClass('has-error');
          isValid=false;
        }
      }
    });
    if(!(isValid)) err_msg = "Please enter all the required fields.";

    if(isValid) {
      $('.field-input.email', jqForm).each(function() {
        if($(this).val().replace(/^\s*|\s*$/g,"") !== "") {
          if(isValid && emailfilter.test($(this).val())==false) {
            $(this).addClass('has-error');
            isValid = false;
          }
        }
      });
      if(!(isValid)) err_msg = "Please enter valid email id.";
    }
    
    if(!(isValid)) {
      $alert.empty().append("<strong>ERROR:</strong> "+err_msg);
      $alert.addClass('error');
      $alert.show();
    } else {
      $('input[type="submit"]', jqForm).addClass('disabled');
      showLoading();
    }
    return isValid;
  }


  function showResponse(responseText, statusText, xhr, $form){
    var $alert = $('.form-submit-errors', $form);
    $alert.removeClass('success error');
    
    if (typeof(responseText.success) == "undefined") {
      responseText = $.parseJSON(responseText);
    }
    console.log ((responseText.message));
    
    if (statusText===" success" || statusText==="success"){
      if (parseInt(responseText.success) === 1) {
        $form.trigger("reset");
        $alert.empty().html(responseText.message).addClass('success').fadeIn();
      } else {
        $alert.empty().html(responseText.message).addClass('error');
      }
      $alert.fadeIn();
      hideLoading();
      return false;
    }
  }
  
  /*
  Checks the MaxLength of the Textarea
  -----------------------------------------------------
  @prerequisite:	textBox = textarea dom element
  e = textarea event
  length = Max length of characters
  */
  function checkTextAreaMaxLength(textBox, e, parent) {
    var maxLength = parseInt($(textBox).data("length"));
    if (!checkSpecialKeys(e)) { 
      if (textBox.value.length > maxLength - 1) textBox.value = textBox.value.substring(0, maxLength); 
    }
    $(".char-count", parent).html(maxLength - textBox.value.length);
    return true; 
  } 
  
  /*
  Checks if the keyCode pressed is inside special chars
  -------------------------------------------------------
  @prerequisite:	e = e.keyCode object for the key pressed
  */
  function checkSpecialKeys(e) { 
    if (e.keyCode != 8 && e.keyCode != 46 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40) 
      return false; 
    else 
      return true; 
  }
  
  function copyToClipboard(str) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(str).select();
    document.execCommand("copy");
    $temp.remove();
  }

  
  function loadWindow() {
    if($('.link-btn__book').length > 0) {
      $('.site-footer').css({'padding-bottom': '60px'});
    }
    
    
  }
  function showHideTopButton() {
    $floatingHeader = $('.floating-header');
    if ($(window).scrollTop() > 600) { 
      $floatingHeader.addClass('floating-header__open'); 
    } else { 
      $floatingHeader.removeClass('floating-header__open'); 
    }
  }
  
  function showHideBookButton() {
    if($('.link-btn__checkout').length > 0) {
      $bookButton = $('.link-btn__book');
      if ($(window).scrollTop() > (parseInt($('.link-btn__checkout').offset().top) - 50)) { 
        $bookButton.addClass('reveal'); 
      } else { 
        $bookButton.removeClass('reveal'); 
      }
    }
  }
  
  function scrollWindow() {
    showHideBookButton();
  }


  function resizeWindow() {}
  
  var body    = $( 'body' ),
    _window = $( window );

  
  ( function() {
    loadWindow();
    $(window).scroll(scrollWindow);
    $(window).resize(resizeWindow);
    
    feather.replace();

    $('.menu-toggle, .menu-close').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      $('.side-nav').toggleClass('side-nav--open');
    })
    
    $('.package-list__slider').not('.slick-initialized').slick({
      dots: false,
      arrows: false,
      infinite: false,
      speed: 300,
      variableWidth: true,
      slidesToShow: 1,
      draggable: true,
      swipeToSlide: true,
      touchMove: true
    });
    
    
    
    if($('.interlink').length > 0){
      $('.interlink').on('click', function(e){
        $href = $(this).attr("href");
        $scrollTo = $href.replace("#", "");
        
        var offset = ($(window).width() > 800) ? scrollOffset : 0;
        if($("#"+$scrollTo).length > 0){
          scrollToElement($("#"+$scrollTo), 800, offset);
        } else if ($("a[name='"+$scrollTo+"']").length > 0){
          scrollToElement($("a[name='"+$scrollTo+"']"), 800, offset);
        }
        return false;
      });
    }
    
    
    $('.modal-link').each(function() {
      var $item = $(this);
      $item.click(function(e) {
        e.preventDefault();
        $modal = $('#modal-'+$(this).data('modal'));
        $('body').delay(150).css({ 'overflow': 'hidden' });
        $modal.addClass('open');
      });
    });
    
    $('.btn-modal-close').each(function() {
      var $btnClose = $(this);
      $btnClose.click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $modal = $btnClose.parents('.modal-overlay');
        $('body').delay(150).css({ 'overflow': 'visible' });
        $modal.removeClass('open');
      });
    });


    var updateSelectPackages = function(location) {
      var listItems= "<option value=''>Select Package</option>";
      var length = packagesJsonList[location].length;
      
      
      for (var i = 0; i < length; i++){
        listItems+= "<option value='" + packagesJsonList[location][i].packageID + "'>" + packagesJsonList[location][i].packageName + "</option>";
        if(length === 1) {
          listPropertyTypes = "<option value=''>Select Property Type</option>";
          for (var j = 0; j < packagesJsonList[location][i].propertyType.length; j++){
            listPropertyTypes+= "<option value='" + packagesJsonList[location][i].propertyType[j] + "'>" + packagesJsonList[location][i].propertyType[j] + "</option>";
            $("select#property_type").html(listPropertyTypes);
          }
        }
      }
      $("select#package").html(listItems);
      if(length > 1) {
        $("select#property_type").html('<option value="">Select Property Type</option>');
      }
    }
    
    var updateSelectPropertyType = function(location, package) {
      listPropertyTypes = "<option value=''>Select Property Type</option>";
      for (var j = 0; j < packagesJsonList[location][package].propertyType.length; j++){
        listPropertyTypes+= "<option value='" + packagesJsonList[location][package].propertyType[j] + "'>" + packagesJsonList[location][package].propertyType[j] + "</option>";
        $("select#property_type").html(listPropertyTypes);
      }
    }
    
    
    $("select#package").on('change',function(){
      var selectedLocation = $('#destination option:selected').val();
      var selectedPackage = $('#package option:selected').val();
//      alert($('#package')[0].selectedIndex);
      if(selectedPackage) {
        updateSelectPropertyType(selectedLocation, selectedPackage);
      } else {
        $("select#property_type").html('<option value="">Select Property Type</option>');
      }
    });
    
    if($('.ajax-form').length > 0) {
      $('.ajax-form').each(function() {
        var options = {
          beforeSubmit:  showRequest,
          success: showResponse
        };
        $(this).submit(function() {
          $(this).ajaxSubmit(options);
          return false;
        });
      });
    }
    
    $('a[href^="tel:"]').each(function() {
      var $item = $(this);
      $item.click(function(e) {
        e.preventDefault();
        var email = $item.attr('href');
        email = email.replace('tel:', '')
        copyToClipboard(email);
        alert('Contact number copied to clipboard');
      });
    });
    
    
	} )();
} )( jQuery );

function get_hostname(url) {
  var m = ((url||'')+'').match(/^https?:\/\/[^/]+/);
  return m ? m[0] : null;
}