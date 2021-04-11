var $ = jQuery;
( function( $ ) {
  function showRequest(formData, $form, options) {
    isValid = true;
    var err_msg;
    var err_cnt = 0;
    
    var $errorMessages = $('.error-message');
    $errorMessages.empty().hide();
        
    $('.input-error').removeClass('input-error');
    if(isValid) {
      $('.field-input.required', $form).each(function() {
        if($(this).parents('.hidden').length > 0) return;
        if($(this).val().replace(/^\s*|\s*$/g,"")=="") {
          $(this).addClass('input-error');
          isValid=false;
        }
      });
    }
    
    if(!(isValid)) {
      err_msg = '<div class="error-header">Please enter your feedback.</div>';
      $errorMessages.html(err_msg).show();
    } else {
      $('body').loadingModal({
          position: 'auto',
          text: 'Updating...',
          color: '#fff',
          opacity: '0.8',
          backgroundColor: 'rgb(0,0,0)',
          animation: 'circle'
      });
    } 
    return isValid;
  }


  function showResponse(responseText, statusText, xhr, $form){
    var $ajaxResponse = $(".ajax-response");
    $ajaxResponse.removeClass("success error");
    console.log(JSON.stringify(responseText));
    
    if (statusText===" success" || statusText==="success"){
      if (parseInt(responseText.success) === 1){
        $('body').loadingModal('text', responseText.message);
        if(responseText.redirect && responseText.redirect.length > 20) {
          setTimeout(function(){
              window.location.href = responseText.redirect;
          }, 1000);
        }
        if(responseText.refresh) {
          setTimeout(function(){
            location.reload();
          }, 1000);
        }
//        $ajaxResponse.empty().html(responseText.message).addClass('success').fadeIn();
      } else {
        $ajaxResponse.empty().html(responseText.message).addClass('error').fadeIn();
        $('body').loadingModal('hide');
      }
    } 
  }
  
  
  ( function() {
    $('.menu-toggle').click(function() {
      $('.nav-links').slideToggle();
    });
    
    if(window.location.hash) {
      hash = window.location.hash.replace(/^.*#/, ''); 
      if(hash != ''){
        if($("."+hash).length > 0){
          scrollToElement($("."+hash), 800, 0);
        }
        if($("#"+hash).length > 0){
          scrollToElement($("#"+hash), 800, 0);
        }
      }
    }
    $('.custom-select').select2({
      minimumResultsForSearch: -1,
      width: 'resolve'
    });
    $('#filter_list').on('select2:select', function (e) {
      window.location.href = 'http://extremityltv.yi3ld.com/admin/dashboard/?status='+$('#filter_list').val();
    });
    
    $('.btn-accept, .btn-reject').each(function() {
      var $item = $(this);
      var $modal = $('#modal-ltv');
      $item.click(function(e) {
        e.preventDefault();
//        $('.thank-you-message', $modal).empty().hide();
//        $('#frmDownload', $modal).show();//removeClass('hidden');
//        $('.alert', $modal).empty().addClass('hidden');

        if($('.switch-wrapper', $modal).length > 0) {
          if($item.data('action')=='reject') {
            $('.switch-wrapper', $modal).removeClass('hidden');
          } else {
            $('.switch-wrapper', $modal).addClass('hidden');
          }
        }

        $('#application_action', $modal).val($item.data('action'));
        $('.modal-title', $modal).text($item.data('type'));

        $modal.modal('show');
      });
    });

    
    if($('.ajax-form').length > 0) {
      $('.ajax-form').each(function() {
        var options = {
          beforeSubmit:  showRequest, 
          success: showResponse
        };
        $($(this)).submit(function() {
          $(this).ajaxSubmit(options);
          return false;
        });
      });
    }
    
    
    if($('#frmSnapshot').length > 0) {
      $('#frmSnapshot').each(function() {
        $form = $(this);
        
        var clinic_revenue = parseFloat($('.clinic_revenue').text());
        var $revenue_per_visit = $('#revenue_per_visit');
        var $visits_per_patient = $('#visits_per_patient');
        
        var $clinic_revenue_patient_visits = $('.clinic_revenue_patient_visits');
        var $total_patients = $('.total_patients');
        
        var $clinic_revenue_per_patient = $('.clinic_revenue_per_patient');
        var clinic_revenue_per_patient = 0;
        var clinic_revenue_patient_visits = 0;
        var total_patients = 0;
        
        
        var pharmacy_revenue = parseFloat($('.pharmacy_revenue').text());
        var $monthly_prescriptions = $('#monthly_prescriptions');
        var $total_prescriptions = $('.total_prescriptions');
        
        
        var total_prescriptions = 0;
        var $per_patient_fills = $('#per_patient_fills');
        var $revenue_per_fill = $(revenue_per_fill);
        var $pharmacy_revenue_per_patient = $('.pharmacy_revenue_per_patient');
        var $patient_gets_prescription = $('patient_gets_prescription');
        
        
        
        $('[type="number"]', $form).each(function() {
          var $item = $(this);
          $item.on("blur",function (e) {
            //clinic revenue
            clinic_revenue_patient_visits = clinic_revenue / $revenue_per_visit.val();
            total_patients = clinic_revenue_patient_visits / $visits_per_patient.val();
            clinic_revenue_per_patient = clinic_revenue / total_patients;
            $clinic_revenue_per_patient.text(clinic_revenue_per_patient.toFixed(2));
            $clinic_revenue_patient_visits.text(clinic_revenue_patient_visits.toFixed(2));
            $total_patients.text(total_patients.toFixed(2));
            
            
            //pharmacy revenue
            total_prescriptions = parseInt($monthly_prescriptions) * 12;
            $total_prescriptions.text(total_prescriptions);
//            $patient_gets_prescription.text();
            
            
            pharmacy_revenue_per_patient = pharmacy_revenue/total_patients;
            $pharmacy_revenue_per_patient.text(pharmacy_revenue_per_patient.toFixed(2));
            
            
            //parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
          });
        });
      });
    }
    
    
    
  } )();
} )( jQuery );