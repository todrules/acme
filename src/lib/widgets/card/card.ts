import {Component, Input, ViewChild} from '@angular/core';
import {ThemeService} from '../../styles/theme';
import {shady} from '../../../services/platform/utils/color-utils';


@Component({
  selector: 'ui-card',
  templateUrl: './card.html',
  styleUrls: ['./card.scss']
})
export class UiCard {

  @ViewChild('carddiv') carddiv;

  constructor(private themeService: ThemeService) {
    themeService.activeTheme.subscribe((theme) => {
      const colorLt = shady(theme.light, 0.4);
      setTimeout(() => {
        this.carddiv.nativeElement.style.backgroundColor = colorLt;

        this.carddiv.nativeElement.style.color = theme.dark;


      });

    });
  }
}
