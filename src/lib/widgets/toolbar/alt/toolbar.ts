import {Component, Input, ViewChild} from '@angular/core';
import {contrastinator, shady} from '../../../../services/platform/utils/color-utils';
import {ThemeService} from '../../../styles/theme';


@Component({
  selector: 'alt-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss']
})
export class AltToolbar {

  @Input() color: string;
  @ViewChild('header') header;
  @ViewChild('endsection') endsection;

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const colorDark = shady(theme.dark, -0.1);
      const colorLt = shady(theme.dark, 0.1);
      const darker = shady(theme.dark, -0.3);
      setTimeout(() => {
        this.header.nativeElement.style.backgroundColor = theme.dark;
        this.header.nativeElement.style.backgroundImage = `-webkit-linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        this.header.nativeElement.style.backgroundImage = `linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        this.header.nativeElement.style.color = theme.light;
        this.header.nativeElement.style.borderBottom = `1px solid ${darker}`;
        this.endsection.nativeElement.style.color = theme.light;
      });

    });
  }
}
