import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCoordinates } from '../../state/mouse.actions';
import { Subscription } from 'rxjs';
import { fromEvent } from 'rxjs';
import { throttleTime, map, distinctUntilChanged } from 'rxjs/operators';
import { TrailService } from 'src/app/service/trail.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnDestroy {
  private mouseMoveSubscription!: Subscription;

  constructor(
    private store: Store<{ mouse: { x: number; y: number } }>,
    private trailService: TrailService
  ) {
    this.mouseMoveSubscription = fromEvent<MouseEvent>(document, 'mousemove')
      .pipe(
        throttleTime(10),
        map((event) => ({ x: event.clientX, y: event.clientY })),
        distinctUntilChanged(
          (prev, curr) => prev.x === curr.x && prev.y === curr.y
        )
      )
      .subscribe((coords) => {
        this.store.dispatch(setCoordinates({ x: coords.x, y: coords.y }));
        this.trailService.createTrail(event as MouseEvent);
      });
  }

  ngOnDestroy() {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
  }
}
