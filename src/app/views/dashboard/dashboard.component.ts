import { Component } from '@angular/core';
import {LayoutModule} from "../../../lib/layout/layout.module";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    LayoutModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
