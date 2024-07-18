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
