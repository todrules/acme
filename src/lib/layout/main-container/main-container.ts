import {Component, OnInit, AfterViewInit, Input, ViewChild, ViewChildren, ElementRef, QueryList} from '@angular/core';
import {Platform} from '../../../services/platform/platform';
import {shady} from '../../../services/platform/utils/color-utils';
import {ThemeService} from '../../styles/theme';
import {SideMenu} from '../../widgets/sidemenu/sidemenu';
import {RouterModule} from "@angular/router";

declare var AmCharts: any;

@Component({
  selector: 'main-container',
  templateUrl: './main-container.html',
  styleUrls: ['./main-container.scss']
})
export class MainContainer implements OnInit, AfterViewInit {

  @ViewChild('maincont') maincont;

  @Input() color: string;
  @Input() title: string;
  @Input() logo: string;
  public isLandscape: boolean;
  public isPortrait: boolean;z
  public width: number;
  public sideBgColor;

  constructor(private platform: Platform, private themeService: ThemeService) {

  }

  ngOnInit() {
    this.init();
  }

  private init = () => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.isLandscape = this.platform.isLandscape();
        this.isPortrait = this.platform.isPortrait();
        this.width = window.innerWidth;
      });
    });
    this.isLandscape = this.platform.isLandscape();
    this.isPortrait = this.platform.isPortrait();
    this.width = window.innerWidth;
  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {
    setTimeout(() => {
      this.themeService.activeTheme.subscribe((theme) => {
        const colorDark = this.themeService.shady(theme.light, -0.1, 'rgba', 0.7);
        const colorLt = this.themeService.shady(theme.light, 0.1, 'rgba', 0.7);
        setTimeout(() => {
          this.maincont.nativeElement.style.backgroundColor = theme.light;
          //  this.maincont.nativeElement.style.backgroundImage = `-webkit-linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
          this.maincont.nativeElement.style.backgroundImage = `linear-gradient(45deg, ${colorDark} 0, ${colorLt} 100%)`;
          this.maincont.nativeElement.style.color = theme.dark;


        });

      });
    });
  }

}
