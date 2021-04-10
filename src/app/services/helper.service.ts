import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class HelperService {


  constructor(
    private toastr: ToastrService
  ) { }

  getFromStorage(key:any) {
    var getValue = localStorage.getItem(key);
    if (getValue !== null) {
      try {
        return JSON.parse(getValue);
      } catch (e) {
          return getValue;
      }
    }
    return "";
  }

  setInStorage(key:any, data:any) {
      localStorage.setItem(key, JSON.stringify(data));
  }

  removeFromStorage(key:any) {
    localStorage.removeItem(key);
  }

  getExpiry(date:any, days:any) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime();
  }

  hideModal(element:any) {
    var $item = $('#'+element);
    var $modal = $('#'+$item.data('hqbe-modal'));
    $('body').removeClass('menu--open').delay(150).css({ 'overflow': 'visible' });
    $modal.removeClass('open');
  }

  showModal(element:any) {
    var $item = $('#'+element);
    var $modal = $('#'+$item.data('hqbe-modal'));
    $('body').addClass('menu--open').delay(150).css({ 'overflow': 'hidden' });
    $modal.addClass('open');
  }

  successToast(msg:any) {
    this.toastr.success(msg, 'Success !');
  }

  errorToast(msg:any) {
    this.toastr.error(msg, 'Error !');
  }

}

