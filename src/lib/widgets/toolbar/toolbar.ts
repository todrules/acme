import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {contrastinator, shady} from '../../../services/platform/utils/color-utils';
import {ThemeService} from '../../styles/theme';

@Component({
  selector: 'ui-toolbar',
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss']
})
export class Toolbar implements AfterViewInit {

  @Input() color: string;
  @ViewChild('header') header;
  @ViewChild('endsection') endsection;

  constructor(private themeService: ThemeService) {

  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {
    this.themeService.activeTheme.subscribe((theme) => {
      console.log('theme changed for toolbar');
      const colorDark = this.themeService.shady(theme[this.color], -0.05, 'rgba', 0.7);
      const colorLt = this.themeService.shady(theme[this.color], 0.05, 'rgba', 0.7);
      const darker = this.themeService.shady(theme[this.color], -0.2);
      setTimeout(() => {
        console.log('toolbar change', colorDark, colorLt);
        this.header.nativeElement.style.backgroundColor = theme[this.color];
        this.header.nativeElement.style.backgroundImage = `linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        //  this.header.nativeElement.style.backgroundImage = `linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        this.header.nativeElement.style.color = this.themeService.contrastinator(theme[this.color], theme.dark, theme.light);
        this.header.nativeElement.style.borderBottom = `1px solid ${darker}`;
        this.endsection.nativeElement.style.color = this.themeService.contrastinator(theme[this.color], theme.dark, theme.light);
      });

    });
  }
}
