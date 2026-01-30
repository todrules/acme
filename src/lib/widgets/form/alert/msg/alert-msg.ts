import {Component, Input, ViewChild} from '@angular/core';
import {ThemeService} from '../../../../styles/theme';
import {shady} from '../../../../../services/platform/utils/color-utils';


@Component({
  selector: 'alert-msg',
  templateUrl: './alert-msg.html',
  styleUrls: ['./alert-msg.scss']
})
export class AlertMsg {

  @Input('msg') msg;
  @Input('type') type;
  @ViewChild('myspan') myspan;

  public color = '';

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const hintcol = shady(theme.dark, 0.3);
      setTimeout(() => {
        if (this.type === 'error') {
          this.myspan.nativeElement.style.color = theme.danger;
        } else if (this.type === 'hint') {
          this.myspan.nativeElement.style.color = hintcol;
        }


      });

    });
  }
}
