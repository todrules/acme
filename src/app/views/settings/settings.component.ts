import { Component } from '@angular/core';
import {Button} from "../../../lib/widgets/button/button";
import {NgForOf, NgStyle} from "@angular/common";
import {ThemeService} from "../../../lib/styles/theme";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    Button,
    NgForOf,
    NgStyle
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  public myThemes;
  public themeDefaults;
  public themeNames;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.init();
  }

  private init = () => {
    this.themeNames = this.themeService.themeNames;
    this.themeDefaults = this.themeService.defaultColors;

    this.themeService.allThemes.subscribe((themes) => {

      setTimeout(() => {
        this.myThemes = themes;
      });

    });
    // this.themeService.setActiveTheme(4);
  }

  public setActiveTheme = (name: string) => {
    this.themeService.setThemeByName(name);

  }

}
