import {Component, Input, ViewChild} from '@angular/core';
import {contrastinator, shady} from '../../../../services/platform/utils/color-utils';
import {ThemeService} from '../../../styles/theme';

@Component({
  selector: 'toolbar-title',
  templateUrl: './title.html',
  styleUrls: ['./title.scss']
})
export class ToolbarTitle {

  @Input() title: string;
  @Input() size: number | string;
  @ViewChild('toolbartitle') toolbartitle;

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const colorDark = shady(theme.primary, -0.1);
      const colorLt = shady(theme.primary, 0.1);
      setTimeout(() => {
        this.toolbartitle.nativeElement.style.color = contrastinator(theme.primary, theme.dark, theme.light);
      });

    });
  }
}
