import {Component, Input, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ThemeService} from '../../styles/theme';
import {shady} from '../../../services/platform/utils/color-utils';


@Component({
  selector: 'ui-sidemenu',
  templateUrl: './sidemenu.html',
  styleUrls: ['./sidemenu.scss']
})
export class SideMenu {

  @Input('msg') msg;
  @ViewChild('sidediv') sidediv;

  public color = '';

  constructor(private router: Router, private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const lt = themeService.shady(theme.light, 0.05);
      setTimeout(() => {
        this.sidediv.nativeElement.style.backgroundColor = lt;

        this.sidediv.nativeElement.style.color = theme.dark;

      });

    });
  }

  public goTo = (url: string) => {
    this.router.navigate([url]);
  }
}
