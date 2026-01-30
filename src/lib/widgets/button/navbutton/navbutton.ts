import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ThemeService} from '../../../styles/theme';
import {Router} from '@angular/router';


@Component({
  selector: 'nav-button',
  templateUrl: './navbutton.html',
  styleUrls: ['./navbutton.scss']
})
export class NavButton implements AfterViewInit {

  @ViewChild('btnIcon') btnIcon;
  @ViewChild('btnLabel') btnLabel;

  @Input() public url: string;
  @Input() public icon: string;
  @Input() public label: string;
  @Input() public bgColor: string;

  constructor(
    private themeService: ThemeService,
    private router: Router) {

  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {

    this.themeService.activeTheme.subscribe((theme) => {

      const bgcolor = this.themeService[this.bgColor];
      const textColor = this.themeService.contrastinator(bgcolor, theme.light, theme.dark);

      setTimeout(() => {
        this.btnIcon.nativeElement.style.color = textColor;
        this.btnLabel.nativeElement.style.color = textColor;

      });

    });
  }

  public goTo = (url: string) => {
    this.router.navigate([url]);
  }
}
