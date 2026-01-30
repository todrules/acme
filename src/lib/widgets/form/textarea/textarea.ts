import {Component, OnInit, AfterViewInit, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {ThemeService} from '../../../styles/theme';
import {shady} from '../../../../services/platform/utils/color-utils';

export interface AlertMessage {
  name: string;
  msg: string;
  type?: AlertType;
  hasErr?: boolean;
}

export enum AlertType {
  hint = 'hint',
  warning = 'warning'
}

@Component({
  selector: 'form-textarea',
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormTextArea implements OnInit, AfterViewInit {

  @Input('inputId') inputId;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 256;
  @Input() rows: number;
  @Input() cols: number;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() hints: AlertMessage[];
  @Input() warnings: AlertMessage[];
  @Input() label: string;
  @Input() type: string;
  @ViewChild('value') value;
  @ViewChild('myinput') myinput;
  @ViewChild('mylabel') mylabel;

  public model = {
    value: null
  };

  public status = {
    dirty: false,
    pristine: true,
    touched: false,
    disabled: false,
    invalid: true,
    valid: false,
    errors: {
      required: false,
      email: false,
      minlength: false,
      maxlength: false
    }
  };

  public validators: AlertMessage[] = [
    {name: 'required', msg: 'This item is required', type: AlertType.warning, hasErr: false},
    {name: 'email', msg: 'Please enter a valid email address.', type: AlertType.warning, hasErr: false},
    {
      name: 'minlength',
      msg: `Input should be at least ${this.minlength} characters.`,
      type: AlertType.warning,
      hasErr: false
    },
    {
      name: 'maxlength',
      msg: `Input exceeded the maximum  of ${this.maxlength} characters.`,
      type: AlertType.warning,
      hasErr: false
    }
  ];

  public activeTheme;

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      this.activeTheme = theme;
      const colorLt = shady(theme.light, 0.4);
      const bordCol = shady(theme.light, -0.1);
      setTimeout(() => {
        this.myinput.nativeElement.style.backgroundColor = theme.light;
        this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
        this.myinput.nativeElement.style.color = theme.dark;
        this.mylabel.nativeElement.style.color = shady(theme.dark, 0.1);

      });

    });
  }

  ngOnInit() {
    this.init();
  }

  private init = () => {

  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {
    setTimeout(() => {

      if (!this.hints) {
        this.hints = [{name: 'placeholder', msg: 'placeholder', hasErr: false}];
      }
      if (!this.warnings) {
        this.warnings = [{name: 'placeholder', msg: 'placeholder', hasErr: false}];
      }
      if (this.required) {
        this.warnings.push(this.validators[0]);
      }
      if (this.type === 'email') {
        this.warnings.push(this.validators[1]);
      }
      if (this.minlength) {
        this.warnings.push({
          name: 'minlength',
          msg: `Input should be at least ${this.minlength} characters.`,
          type: AlertType.warning,
          hasErr: false
        });
      }
      if (this.maxlength) {
        this.warnings.push({
          name: 'maxlength',
          msg: `Input exceeded the maximum  of ${this.maxlength} characters.`,
          type: AlertType.warning,
          hasErr: false
        });
      }
      if (!this.required) {
        this.required = false;
      }

    });
  }

  public focusInput = () => {
    const shadow = shady(this.activeTheme.primary, 0.7);
    const border = shady(this.activeTheme.primary, 0.3)
    this.myinput.nativeElement.style.border = `1px solid ${border}`;

    this.myinput.nativeElement.style.filter = `drop-shadow(1px 1px 1px ${shadow}) drop-shadow(-1px -1px 1px ${shadow})`;
  }

  public blurInput = () => {
    const bordCol = shady(this.activeTheme.light, -0.1);
    console.log(this.value);
    if (this.value.invalid && (this.value.touched || this.value.dirty)) {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
      this.myinput.nativeElement.style.borderLeft = `4px solid ${this.activeTheme.danger}`;
      this.myinput.nativeElement.style.borderRight = `4px solid ${this.activeTheme.danger}`;
    } else if (this.value.valid && (this.value.touched || this.value.dirty)) {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
      this.myinput.nativeElement.style.borderLeft = `4px solid ${this.activeTheme.success}`;
      this.myinput.nativeElement.style.borderRight = `4px solid ${this.activeTheme.success}`;
    } else {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
    }
  }


}
