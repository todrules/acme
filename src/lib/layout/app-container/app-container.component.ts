import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {contrastinator, shady} from '../../../services/platform/utils/color-utils';
import {ThemeService} from '../../styles/theme';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.html',
  styleUrls: ['./app-container.scss']
})
export class AppContainer implements OnInit, AfterViewInit {

  @ViewChild('appcont') appcont;

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const colorDark = shady(theme.light, -0.1);
      const colorLt = shady(theme.light, 0.1);
      setTimeout(() => {
        this.appcont.nativeElement.style.backgroundColor = theme.light;
        this.appcont.nativeElement.style.backgroundImage = `-webkit-linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        this.appcont.nativeElement.style.backgroundImage = `linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
        this.appcont.nativeElement.style.color = theme.dark;

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
      // do something
    });
  }

}
