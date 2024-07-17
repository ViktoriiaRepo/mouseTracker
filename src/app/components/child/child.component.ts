import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent {
  mouseCoordinates$: Observable<{ x: number; y: number }>;

  constructor(private store: Store<{ mouse: { x: number; y: number } }>) {
    this.mouseCoordinates$ = this.store.pipe(select('mouse'));
  }
}
