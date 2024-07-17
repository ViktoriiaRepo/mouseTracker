// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class TrailService {
//   trail(event: MouseEvent): void {
//     let div = document.createElement('div');
//     div.classList.add('happyTrail');
//     Object.assign(div.style, {
//       top: event.pageY + 'px',
//       left: event.pageX + 'px',
//     });
//     document.body.appendChild(div);
//     setTimeout(function () {
//       document.body.removeChild(div);
//     }, 500);
//   }
// }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  private trailElements: HTMLElement[] = [];

  constructor() {}

  createTrail(event: MouseEvent): void {
    const trailElement = document.createElement('div');
    trailElement.classList.add('trail');
    trailElement.style.top = event.pageY + 'px';
    trailElement.style.left = event.pageX + 'px';
    document.body.appendChild(trailElement);
    this.trailElements.push(trailElement);

    setTimeout(() => {
      trailElement.remove();
      this.trailElements.shift();
    }, 500);
  }
}
