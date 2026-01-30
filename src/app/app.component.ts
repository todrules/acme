import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LayoutModule} from "../lib/layout/layout.module";
import {HttpClientModule} from "@angular/common/http";
import {ThemeService} from "../lib/styles/theme";
import {Button} from "../lib/widgets/button/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutModule, HttpClientModule, Button],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Acme Widgets';

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
    console.log(this.themeNames);
    this.themeService.setThemeByName(this.themeNames[0]);
  }

}
