import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'OK';

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.bsModalRef.hide();
  }

  confirm() {

  }

}
