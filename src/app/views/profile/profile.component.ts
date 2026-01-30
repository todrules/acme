import { Component } from '@angular/core';
import {Button} from "../../../lib/widgets/button/button";
import {ThemeService} from "../../../lib/styles/theme";
import {NgForOf, NgStyle} from "@angular/common";
import {WidgetsModule} from "../../../lib/widgets/widgets.module";
import {Customer} from "../../../services/api";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    Button,
    NgStyle,
    NgForOf,
    WidgetsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  public myThemes;
  public themeDefaults;
  public themeNames;

  public myprofile: Customer = {
    firstname: 'Todd',
    lastname: 'Goodwin',
    email: 'goodwintodd@gmail.com'
  };


  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.init();
  }

  private init = () => {
    this.myprofile.firstname = 'Todd';

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
