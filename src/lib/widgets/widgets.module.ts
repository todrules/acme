import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormInput} from './form/input/input';
import {FormAlert} from './form/alert/form-alert';
import {AlertMsg} from './form/alert/msg/alert-msg';
import {FormsModule} from '@angular/forms';
import {UiCard} from './card/card';
import {Spacer} from './spacer/spacer';
import {ToolbarTitle} from './toolbar/title/title';
import {Toolbar} from './toolbar/toolbar';
import {SideMenu} from './sidemenu/sidemenu';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import {UiPieChart} from './charts/pie/pie-chart';
import {UiBarChart} from './charts/bar/bar-chart';
import {UiAreaChart} from './charts/area/area-chart';
import {UiPyramidChart} from './charts/pyramid/pyramid-chart';
import {AltToolbar} from './toolbar/alt/toolbar';
import {FormTextArea} from './form/textarea/textarea';
import {Gauge} from './gauge/gauge';
import {NavButton} from './button/navbutton/navbutton';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmChartsModule
  ],
  declarations: [
    FormInput,
    FormAlert,
    AlertMsg,
    UiCard,
    Spacer,
    ToolbarTitle,
    Toolbar,
    SideMenu,
    UiPieChart,
    UiBarChart,
    UiAreaChart,
    UiPyramidChart,
    AltToolbar,
    FormTextArea,
    Gauge,
    NavButton
  ],
  exports: [
    CommonModule,
    FormsModule,
    FormInput,
    FormAlert,
    AlertMsg,
    UiCard,
    Spacer,
    ToolbarTitle,
    Toolbar,
    SideMenu,
    UiPieChart,
    UiBarChart,
    UiAreaChart,
    UiPyramidChart,
    AltToolbar,
    FormTextArea,
    Gauge,
    NavButton
  ]
})
export class WidgetsModule {

}
