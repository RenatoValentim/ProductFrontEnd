import { Injectable } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  PRIMATY = 'primary',
  DANGE = 'danger',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimout) {
      setTimeout(() => bsModalRef.hide(), dismissTimout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGE);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 1000);
  }

  showConfirm(title: string, message: string, cancelTxt?: string, okTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    (bsModalRef.content as ConfirmModalComponent).title = title;
    (bsModalRef.content as ConfirmModalComponent).message = message;

    if (cancelTxt) {
      (bsModalRef.content as ConfirmModalComponent).cancelTxt = cancelTxt;
    }

    if (okTxt) {
      (bsModalRef.content as ConfirmModalComponent).okTxt = okTxt;
    }

    return (bsModalRef.content as ConfirmModalComponent).confirmResult;
  }

}
