import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
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
  selector: 'form-input',
  templateUrl: './input.html',
  styleUrls: ['./input.scss']
})
export class FormInput implements OnInit, AfterViewInit {

  @Input('inputId') inputId;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 256;
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() hints: AlertMessage[];
  @Input() warnings: AlertMessage[];
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() inputValue;
  @Output() inputValueChange = new EventEmitter<string>;
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
    {name: 'required', msg: 'This item is required.', type: AlertType.warning, hasErr: false},
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
    this.themeService.activeTheme.subscribe((theme) => {
      this.activeTheme = theme;
      const colorLt = shady(theme.light, 0.4);
      const bordCol = shady(theme.light, -0.1);
      setTimeout(() => {
        this.myinput.nativeElement.style.backgroundColor = theme.light;
        this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
        this.myinput.nativeElement.style.color = theme.dark;
        this.mylabel.nativeElement.style.color = shady(theme.primary, -0.2);

      });

    });

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
          msg: `Minimum length of ${this.minlength}.`,
          type: AlertType.warning,
          hasErr: false
        });
      }
      if (this.maxlength) {
        this.warnings.push({
          name: 'maxlength',
          msg: `Maximum length of ${this.maxlength}.`,
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
    const shadow = shady(this.activeTheme.secondary, 0.7);
    const border = shady(this.activeTheme.secondary, 0.3)
    this.myinput.nativeElement.style.border = `1px solid ${border}`;

    this.myinput.nativeElement.style.filter = `drop-shadow(1px 1px 1px ${shadow}) drop-shadow(-1px -1px 1px ${shadow})`;
  }

  public blurInput = () => {
    this.onValueChange(this.inputValue);
    const bordCol = shady(this.activeTheme.light, -0.1);
    console.log(this.status);
    if (this.status.invalid && (this.status.touched || this.status.dirty)) {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
      this.myinput.nativeElement.style.borderLeft = `4px solid ${this.activeTheme.danger}`;
      this.myinput.nativeElement.style.borderRight = `4px solid ${this.activeTheme.danger}`;
    } else if (this.status.valid && (this.status.touched || this.status.dirty)) {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
      this.myinput.nativeElement.style.borderLeft = `4px solid ${this.activeTheme.success}`;
      this.myinput.nativeElement.style.borderRight = `4px solid ${this.activeTheme.success}`;
    } else {
      this.myinput.nativeElement.style.border = `1px solid ${bordCol}`;
      this.myinput.nativeElement.style.filter = 'none';
    }
  }

  public onValueChange = (val: string) => {

    this.status.touched = true;
    this.status.dirty = true;
    this.status.pristine = false;
    this.status.errors.required = this.required && val.length < 1;
    this.status.errors.minlength = val.length < this.minlength;
    this.status.errors.maxlength = val.length > this.maxlength;

    if (this.type === 'email') {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      this.status.errors.email = !val.match(validRegex);
    }

    if (this.status.errors.required || this.status.errors.minlength || this.status.errors.maxlength || this.status.errors.email) {
      this.status.invalid = true;
      this.status.valid = false;
    } else {
      this.status.valid = true;
      this.status.invalid = false;
    }
    this.inputValueChange.emit(val);
  }


}
