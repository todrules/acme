import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MY_THEMES} from './themes/themes';
import {BehaviorSubject} from "rxjs";


export interface ThemeInterface {
  primary?: string;
  secondary?: string;
  accent?: string;
  info?: string;
  success?: string;
  warn?: string;
  danger?: string;
  dark?: string;
  light?: string;
}

export interface TypeBase {
  fontFamily: string;
  fontSize?: string;
  fontWeight: number | string;
}

export interface ThemeFont {
  fontFamily: string;
  weights: string[] | number[];
}

export interface TypeConfig {
  fontBase: TypeBase;
  h1?: TypeBase;
  h2?: TypeBase;
  h3?: TypeBase;
  h4?: TypeBase;
  h5?: TypeBase;
  h6?: TypeBase;
  display1?: TypeBase;
  display2?: TypeBase;
  display3?: TypeBase;
  display4?: TypeBase;
  display5?: TypeBase;
  display6?: TypeBase;
  themeFonts?: ThemeFont[];

}

export interface ThemeConfig {
  name: string;
  colors: ThemeInterface;
  type?: TypeConfig;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

const defaultColors = {
  primary: '#0072C6',
  secondary: '#49306B',
  accent: '#aac24e',
  info: '#00ABEC',
  success: '#89C402',
  warn: '#e1ba2c',
  danger: '#DF3D82',
  dark: '#191E22',
  light: '#f2f2f2'
};

const THEMES = [
  {
    'name': 'Main Theme',
    'colors': {
      'primary': '#255C99',
      'accent': '#A1E44D',
      'secondary': '#027BCE',
      'warn': '#FDB833',
      'danger': '#950952',
      'success': '#99C24D',
      'info': '#07A0C3',
      'dark': '#272932',
      'light': '#EAEBED'
    }
  },
  {
    'name': 'Berry Delight',
    'colors': {
      'primary': '#0072C6',
      'accent': '#aac24e',
      'secondary': '#49306B',
      'warn': '#e1ba2c',
      'danger': '#DF3D82',
      'success': '#89C402',
      'info': '#00ABEC',
      'dark': '#191E22',
      'light': '#f2f2f2'
    }
  },
  {
    'name': 'Bruised Ego',
    'colors': {
      'primary': '#3B3355',
      'accent': '#F18805',
      'secondary': '#5D5D81',
      'warn': '#e1ba2c',
      'danger': '#C492B1',
      'success': '#679436',
      'info': '#BCE7FD',
      'dark': '#424651',
      'light': '#FEFCFD'
    }
  },
  {
    'name': 'Muted Earth',
    'colors': {
      'primary': '#2D232E',
      'accent': '#84732B',
      'secondary': '#534B52',
      'warn': '#B1740F',
      'danger': '#C17C74',
      'success': '#BDC667',
      'info': '#F7DBA7',
      'dark': '#1C1F21',
      'light': '#F1F0EA'
    }
  },
  {
    'name': 'Neon Freon',
    'colors': {
      'primary': '#BA2C73',
      'accent': '#DCED31',
      'secondary': '#2D3047',
      'warn': '#E0CA3C',
      'danger': '#C492B1',
      'success': '#82D173',
      'info': '#BCE7FD',
      'dark': '#424651',
      'light': '#f2f2f2'
    }
  },
  {
    'name': 'Deep Ocean',
    'colors': {
      'primary': '#40476D',
      'accent': '#7F95D1',
      'secondary': '#1C5D99',
      'warn': '#FF6B35',
      'dark': '#222222',
      'light': '#EAEAEA',
      'danger': '#893168',
      'success': '#82D173',
      'info': '#4EA5D9'
    }
  },
  {
    'name': 'Emerald Forest',
    'colors': {
      'primary': '#004346',
      'accent': '#95E06C',
      'secondary': '#412234',
      'warn': '#FFC857',
      'danger': '#DB2763',
      'success': '#C3F73A',
      'info': '#8FB8DE',
      'dark': '#343434',
      'light': '#BDD9BF'
    }
  },
  {
    'name': 'Flatland',
    'colors': {
      'primary': '#7C98B3',
      'accent': '#CEE5F2',
      'secondary': '#ACCBE1',
      'warn': '#e1ba2c',
      'danger': '#DF3D82',
      'success': '#89C402',
      'info': '#00ABEC',
      'dark': '#637081',
      'light': '#f2f2f2'
    }
  },
  {
    'name': 'Pastels',
    'colors': {
      'primary': '#C0B9DD',
      'accent': '#F2F79E',
      'secondary': '#BEEF9E',
      'warn': '#9C89B8',
      'danger': '#F0A6CA',
      'success': '#A6FFA1',
      'info': '#5B5F97',
      'dark': '#2F323A',
      'light': '#E9F1F7'
    }
  },
  {
    'name': 'Stoplight',
    'colors': {
      'primary': '#FF5C80',
      'accent': '#FEFFBE',
      'secondary': '#DDFC74',
      'warn': '#DDE392',
      'danger': '#883955',
      'success': '#CBE896',
      'info': '#05668D',
      'dark': '#49475B',
      'light': '#F5EFED'
    }
  },
  {
    'name': 'Bolden Delicious',
    'colors': {
      'primary': '#0C55B8',
      'accent': '#F49D37',
      'secondary': '#D72638',
      'warn': '#DDE392',
      'danger': '#F22B29',
      'success': '#CBE896',
      'info': '#140F2D',
      'dark': '#49475B',
      'light': '#F5EFED'
    }
  }
];

const myDefaultTheme = {
  name: 'Default Theme',
  colors: defaultColors
}

export const COLORS = Object.assign({}, myDefaultTheme);
export let INIT_THEME = new InjectionToken<ThemeConfig>('theme.state');


@Injectable(
  {providedIn: 'root'}
)
export class ThemeService {

  public activeTheme = new BehaviorSubject<ThemeInterface>(myDefaultTheme.colors);
  public allThemes = new BehaviorSubject<ThemeConfig[]>(MY_THEMES);

  public get primary(): string {
    return this._primary;
  }

  public get secondary(): string {
    return this._secondary;
  }

  public get accent(): string {
    return this._accent;
  }

  public get light(): string {
    return this._light;
  }

  public get dark(): string {
    return this._dark;
  }

  public get info(): string {
    return this._info;
  }

  public get success(): string {
    return this._success;
  }

  public get warn(): string {
    return this._warn;
  }

  public get danger(): string {
    return this._danger;
  }

  private _primary: string;
  private _secondary: string;
  private _accent: string;
  private _light: string;
  private _dark: string;
  private _info: string;
  private _success: string;
  private _warn: string;
  private _danger: string;

  private _myThemes;
  private _themeColors;
  private _themeNames;
  private _defaultColors;
  private _chartTheme;

  constructor(private http: HttpClient) {

    this._myThemes = THEMES;
    this.allThemes = new BehaviorSubject<ThemeConfig[]>(THEMES);
    this._themeNames = [];
    this._defaultColors = THEMES[0].colors;

    for (let i = 0; i < THEMES.length; i++) {
      this._themeNames.push(THEMES[i].name);
    }
    this._primary = this._defaultColors.primary;
    this._secondary = this._defaultColors.secondary;
    this._accent = this._defaultColors.accent;
    this._light = this._defaultColors.light;
    this._dark = this._defaultColors.dark;
    this._info = this._defaultColors.info;
    this._success = this._defaultColors.success;
    this._warn = this._defaultColors.warn;
    this._danger = this._defaultColors.danger;

    this.setTheme(this._myThemes[0].colors);

    this.activeTheme.subscribe((theme) => {

      this._primary = theme.primary;
      this._secondary = theme.secondary;
      this._accent = theme.accent;
      this._light = theme.light;
      this._dark = theme.dark;
      this._info = theme.info;
      this._success = theme.success;
      this._warn = theme.warn;
      this._danger = theme.danger;

    });

  }

  public setTheme = (theme: ThemeInterface) => {

    console.log('Theme set!');
    console.log(theme);
    const activeTheme = Object.assign({}, this._defaultColors, theme);
    this.activeTheme.next(activeTheme);
    this.setChartTheme(activeTheme);
  }

  public setAllthemes(themes: ThemeConfig[]) {
    const newThemes = Object.assign({}, themes);
    this.allThemes.next(newThemes);
  }

  public get myThemes() {
    return this.allThemes.value;
  }

  public get defaultColors() {
    return this._defaultColors;
  }

  public get themeNames() {
    return this._themeNames;
  }


  public setThemeByName = (name: string) => {

    this._myThemes.forEach((theme) => {
      if (theme.name === name) {
        this.setTheme(theme.colors);
      }
    });

  }

  public getActiveTheme = () => {
    return this.activeTheme.value;
  }

  public getChartTheme = () => {
    return this._chartTheme;
  }

  private setChartTheme = (theme: any) => {
    this._chartTheme = {
      themeName: 'light',
      AmChart: {
        color: theme.dark,
        backgroundColor: theme.light
      },
      AmCoordinateChart: {
        colors: [
          theme.primary,
          theme.warn,
          theme.accent,
          theme.dark,
          theme.secondary,
          theme.danger,
          theme.success,
          theme.info,
          theme.light
        ]
      }, AmStockChart: {
        colors: [
          theme.primary,
          theme.warn,
          theme.accent,
          theme.dark,
          theme.secondary,
          theme.danger,
          theme.success,
          theme.info,
          theme.light
        ]
      },
      AmSlicedChart: {
        colors: [
          theme.primary,
          theme.warn,
          theme.accent,
          theme.dark,
          theme.secondary,
          theme.danger,
          theme.success,
          theme.info,
          theme.light
        ],
        outlineAlpha: 1,
        outlineThickness: 2,
        labelTickColor: theme.dark,
        labelTickAlpha: 0.3
      },
      AmRectangularChart: {
        zoomOutButtonColor: theme.dark,
        zoomOutButtonRollOverAlpha: 0.15,
        zoomOutButtonImage: 'lens'
      },
      AxisBase: {
        axisColor: theme.dark,
        axisAlpha: 0.3,
        gridAlpha: 0.1,
        gridColor: theme.dark
      },
      ChartScrollbar: {
        backgroundColor: theme.dark,
        backgroundAlpha: 0.12,
        graphFillAlpha: 0.5,
        graphLineAlpha: 0,
        selectedBackgroundColor: theme.light,
        selectedBackgroundAlpha: 0.4,
        gridAlpha: 0.15
      },
      ChartCursor: {
        cursorColor: theme.dark,
        color: theme.light,
        cursorAlpha: 0.5
      },
      AmLegend: {
        color: theme.dark
      },
      AmGraph: {
        lineAlpha: 0.9
      },
      GaugeArrow: {
        color: theme.dark,
        alpha: 0.8,
        nailAlpha: 0,
        innerRadius: '40%',
        nailRadius: 15,
        startWidth: 15,
        borderAlpha: 0.8,
        nailBorderAlpha: 0
      },
      GaugeAxis: {
        tickColor: theme.dark,
        tickAlpha: 1,
        tickLength: 15,
        minorTickLength: 8,
        axisThickness: 3,
        axisColor: theme.dark,
        axisAlpha: 1,
        bandAlpha: 0.8
      },
      TrendLine: {
        lineColor: theme.danger,
        lineAlpha: 0.8
      },
      AreasSettings: {
        alpha: 0.7,
        color: theme.success,
        colorSolid: theme.success,
        unlistedAreasAlpha: 0,
        unlistedAreasColor: theme.dark,
        outlineColor: theme.light,
        outlineAlpha: 0,
        outlineThickness: 0,
        rollOverColor: theme.primary,
        rollOverOutlineColor: theme.light,
        selectedOutlineColor: theme.light,
        selectedColor: theme.warn,
        unlistedAreasOutlineColor: theme.light,
        unlistedAreasOutlineAlpha: 0
      },
      LinesSettings: {
        color: theme.dark,
        alpha: 0
      },
      ImagesSettings: {
        alpha: 0.8,
        labelColor: theme.dark,
        color: theme.dark,
        labelRollOverColor: theme.primary
      },
      ZoomControl: {
        buttonFillAlpha: 0.7,
        buttonIconColor: theme.light
      },
      SmallMap: {
        mapColor: theme.dark,
        rectangleColor: theme.warn,
        backgroundColor: theme.light,
        backgroundAlpha: 0.7,
        borderThickness: 1,
        borderAlpha: 0.8
      },
      PeriodSelector: {
        color: theme.dark
      },
      PeriodButton: {
        color: theme.dark,
        background: 'transparent',
        opacity: 0.7,
        border: '1px solid rgba(0, 0, 0, .3)',
        MozBorderRadius: '5px',
        borderRadius: '5px',
        margin: '1px',
        outline: 'none',
        boxSizing: 'border-box'
      },
      PeriodButtonSelected: {
        color: theme.dark,
        backgroundColor: theme.success,
        border: '1px solid rgba(0, 0, 0, .3)',
        MozBorderRadius: '5px',
        borderRadius: '5px',
        margin: '1px',
        outline: 'none',
        opacity: 1,
        boxSizing: 'border-box'
      },
      PeriodInputField: {
        color: theme.dark,
        background: 'transparent',
        border: '1px solid rgba(0, 0, 0, .3)',
        outline: 'none'
      },
      DataSetSelector: {
        color: theme.dark,
        selectedBackgroundColor: theme.accent,
        rollOverBackgroundColor: theme.accent
      },
      DataSetCompareList: {
        color: theme.dark,
        lineHeight: '100%',
        boxSizing: 'initial',
        webkitBoxSizing: 'initial',
        border: '1px solid rgba(0, 0, 0, .3)'
      },
      DataSetSelect: {
        border: '1px solid rgba(0, 0, 0, .3)',
        outline: 'none'
      }
    };
  }

  public contrastinator = (
    color: string,
    contrast1: string,
    contrast2: string
  ): string => {


    const color1RGB = this.hexToRgb(color);
    const cont1RGB = this.hexToRgb(contrast1);
    const cont2RGB = this.hexToRgb(contrast2);

    const colorLum = this.getLuminance(color1RGB);
    const cont1Lum = this.getLuminance(cont1RGB);
    const cont2Lum = this.getLuminance(cont2RGB);

    const ratio1 = this.getRatio(colorLum, cont1Lum);
    const ratio2 = this.getRatio(colorLum, cont2Lum);

    const winner = this.checkRatios(ratio1, contrast1, ratio2, contrast2);
    if (winner) {
      console.log('We have a winner! (winner)', winner);
      return winner;
    } else {
      let newWinner;
      if (cont1Lum > cont2Lum) {
        newWinner = this.checkNewShades(colorLum, contrast1, contrast2);
      } else {
        newWinner = this.checkNewShades(colorLum, contrast2, contrast1);
      }

      if (newWinner.length === 1) {
        console.log('We have a winner! (newWinner#1)', newWinner[0]);
        return newWinner[0];
      } else {

        let loopW1 = newWinner[0];
        let loopW2 = newWinner[1];

        for (let i = 0; i < 10; i++) {
          newWinner = this.checkNewShades(colorLum, loopW1, loopW2);
          if (newWinner.length === 1) {
            console.log('We have a winner! (newWinner#2)', newWinner[0]);
            return newWinner[0];
          } else {
            loopW1 = newWinner[0];
            loopW2 = newWinner[1];
          }
        }
        if (colorLum > 0.5) {
          return this.dark;
        } else {
          return this.light;
        }

      }

    }
  }

  private checkNewShades = (
    colorLum: number,
    contrast1: string,
    contrast2: string) => {

    const newCont1 = this.shady(contrast1, 0.05, 'hex');
    const newCont2 = this.shady(contrast2, -0.05, 'hex');
    const new1RGB = this.hexToRgb(newCont1);
    const new2RGB = this.hexToRgb(newCont2);
    const new1Lum = this.getLuminance(new1RGB);
    const new2Lum = this.getLuminance(new2RGB);
    const newratio1 = this.getRatio(colorLum, new1Lum);
    const newratio2 = this.getRatio(colorLum, new2Lum);

    const winner = this.checkRatios(newratio1, newCont1, newratio2, newCont2);
    if (winner !== null) {
      return [winner];
    } else {
      if (new1Lum > new2Lum) {
        return [newCont1, newCont2];
      } else {
        return [newCont2, newCont1];
      }

    }

  }

  private checkRatios = (ratio1: number, contrast1: string, ratio2: number, contrast2: string): string | null => {

    if (ratio1 > ratio2) {
      if (ratio1 >= 4.5) {
        return contrast1;
      } else {
        return null;
      }
    } else if (ratio2 > ratio1) {
      if (ratio2 >= 4.5) {
        return contrast2;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private getRatio = (lum1: number, lum2: number): number => {

    let ratio = 1;

    if (lum1 > lum2) {
      ratio = (lum1 + 0.05) / (lum2 + 0.05);
    } else if (lum2 > lum1) {
      ratio = (lum2 + 0.05) / (lum1 + 0.05);
    }

    return ratio;
  }

  public getLuminance = (color: RGBColor) => {

    const rgb = [color.r / 255, color.g / 255, color.g / 255];

    for (let i = 0; i < rgb.length; i++) {
      if (rgb[i] <= 0.03928) {
        rgb[i] = rgb[i] / 12.92;
      } else {
        rgb[i] = Math.pow(((rgb[i] + 0.055) / 1.055), 2.4);
      }
    }

    return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]);
  }

  public getColorDiff = (color1: RGBColor, color2: RGBColor) => {

    return ((Math.max(color1.r, color2.r) - Math.min(color1.r, color2.r)) +
      (Math.max(color1.g, color2.g) - Math.min(color1.g, color2.g)) +
      (Math.max(color1.b, color2.b) - Math.min(color1.b, color2.b)));
  }

  public getBrightness = (color: string): number => {

    const rgb = this.hexToRgb(color);

    if (rgb === null) {
      console.error('Error converting hex to RGB #ThemeService.getBrightness', color);
      return null;
    }
    return (rgb.r * 0.299) + (rgb.g * 0.587) + (rgb.b * 0.114);
  }

  public hexToRgb = (hex) => {

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  public shady = (
    color: string,
    amount: number = 0.1,
    retType: string = 'hex',
    newOpacity?: number): string => {

    let t = 255;
    let p = amount;
    let newamt;

    if (amount < 0) {
      t = 0;
      p = amount * -1;
    }
    let rgb = {r: 0, g: 0, b: 0, a: null};

    if (color[0] === '#') {

      rgb = Object.assign({}, rgb, this.hexToRgb(color));

    } else if (color[0] === 'r') {

      const arr = color.split(',');

      rgb.r = +arr[0];
      rgb.g = +arr[1];
      rgb.b = +arr[2];
      rgb.a = arr.length === 4 ? +arr[3] : rgb.a;

    } else {

      console.error('Invalid color #ThemeService.shady', color);
      return null;

    }

    const hsl = this.rgbToHsl(rgb);
    hsl[2] = hsl[2] + +amount;
    hsl[2] = hsl[2] > 1 ? 1 : hsl[2];
    hsl[2] = hsl[2] < 0 ? 0 : hsl[2];
    const hslColor = {
      h: hsl[0],
      s: hsl[1],
      l: hsl[2]
    };

    const newrgb = this.hslToRgb(hslColor);
    const r = newrgb[0];
    const g = newrgb[1];
    const b = newrgb[2];

    if (newOpacity) {
      rgb.a = newOpacity;
    }

    //  const r = Math.round((t - rgb.r) * p) + rgb.r;
    //  const g = Math.round((t - rgb.g) * p) + rgb.g;
    //  const b = Math.round((t - rgb.b) * p) + rgb.b;

    if (retType === 'rgba' && rgb.a !== null) {

      newamt = 'rgba(' + [r, g, b, rgb.a].join(',') + ')';

    } else if (retType === 'rgba' && rgb.a === null) {

      newamt = 'rgba(' + [r, g, b].join(',') + ',1)';

    } else if (retType === 'rgb') {

      newamt = 'rgb(' + [r, g, b].join(',') + ')';

    } else {
      let hxR = r.toString(16);
      let hxG = g.toString(16);
      let hxB = b.toString(16);
      newamt = `#${hxR}${hxG}${hxB}`;
    }
    return newamt;

  }

  public rgbToHsl = (color: RGBColor) => {

    const r = color.r / 255;
    const g = color.g / 255;
    const b = color.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h;
    let s;
    const l = (max + min) / 2;

    if (max === min) {

      h = 0;
      s = 0;

    } else {

      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          console.error('uh-oh! Got an error! themeservice.rgbToHsl');
          return [0,0,0];
      }

      h /= 6;
    }

    return [h, s, l];
  }

  public hslToRgb = (color: HSLColor) => {
    let r;
    let g;
    let b;

    const h = color.h;
    const s = color.s;
    const l = color.l;

    if (s === 0) {

      r = l;
      g = l;
      b = l;

    } else {


      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = this.hue2rgb(p, q, h + 1 / 3);
      g = this.hue2rgb(p, q, h);
      b = this.hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
  }

  private hue2rgb = (p, q, t) => {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }

}

