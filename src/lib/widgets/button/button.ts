import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {ThemeService} from "../../styles/theme";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button implements AfterViewInit {

  @ViewChild('button') button;

  @Input() color: string;
  @Input() raised = false;

  constructor(private themeService: ThemeService) {

  }

  ngAfterViewInit() {
    this.viewInit();
  }

  private viewInit = () => {

    this.themeService.activeTheme.subscribe((theme) => {

      const bgcolor = this.themeService[this.color];
      const textColor = this.themeService.contrastinator(bgcolor, theme.light, theme.dark);

      setTimeout(() => {
        this.button.nativeElement.style.backgroundColor = bgcolor;
        this.button.nativeElement.style.color = textColor;

        if (this.raised) {
          this.button.nativeElement.style.boxShadow = '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)';
        }

      });

    });
  }

}
