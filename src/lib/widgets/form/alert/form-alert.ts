import {AfterViewInit, Component, Input} from '@angular/core';
import {AlertMessage} from '../input/input';


@Component({
  selector: 'form-alert',
  templateUrl: './form-alert.html',
  styleUrls: ['./form-alert.scss']
})
export class FormAlert implements AfterViewInit {

  @Input('minlength') minlength: number;
  @Input('maxlength') maxlength: number;
  @Input() hints: AlertMessage[];
  @Input() warnings: AlertMessage[];
  @Input('requiredErr') requiredErr: boolean;
  @Input('minlengthErr') minlengthErr: boolean;
  @Input('maxlengthErr') maxlengthErr: boolean;
  @Input('emailErr') emailErr: boolean;
  @Input('invalid') invalid: boolean;
  @Input('dirty') dirty: boolean;
  @Input('touched') touched: boolean;

  constructor() {

  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {
    setTimeout(() => {
      console.log(this.hints);
      if (!this.requiredErr) {
        this.requiredErr = false;
      }
      if (!this.minlengthErr) {
        this.minlengthErr = false;
      }
      if (!this.maxlengthErr) {
        this.maxlengthErr = false;
      }
      if (!this.emailErr) {
        this.emailErr = false;
      }

    });
  }
}
