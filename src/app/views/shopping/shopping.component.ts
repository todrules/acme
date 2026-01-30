import { Component } from '@angular/core';
import {WidgetsModule} from "../../../lib/widgets/widgets.module";

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [
    WidgetsModule
  ],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {

}
