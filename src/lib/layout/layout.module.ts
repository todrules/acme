import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppContainer} from './app-container/app-container.component';
import {MainContainer} from './main-container/main-container';
import {WidgetsModule} from '../widgets/widgets.module';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    WidgetsModule,
    RouterModule
  ],
  declarations: [
    AppContainer,
    MainContainer
  ],
  exports: [
    CommonModule,
    AppContainer,
    MainContainer,
    WidgetsModule
  ]
})
export class LayoutModule {

}
