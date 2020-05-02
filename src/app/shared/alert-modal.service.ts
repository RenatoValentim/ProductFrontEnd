import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Injectable } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
}
