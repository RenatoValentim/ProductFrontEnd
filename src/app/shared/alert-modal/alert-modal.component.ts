import { Component, OnInit, Input } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertTypes } from '../alert-modal.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  @Input() type: AlertTypes;
  @Input() message: string;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

}
