import {Component} from '@angular/core';

@Component({
  selector: 'ui-spacer',
  template: `
    <div>&nbsp;</div>
  `,
  styles: [
    `
      ui-spacer, ui-spacer div {
        width: 100%;
        max-width: 2vw;
        content: "";
        display: flex;
        flex-grow: 1;
      }
    `
  ]
})
export class Spacer {

  constructor() {

  }
}
