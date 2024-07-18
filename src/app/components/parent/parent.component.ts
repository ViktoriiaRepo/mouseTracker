import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements OnDestroy {
  private mouseMoveSubscription!: Subscription;
  trackingEnabled = false;

  constructor(
    private store: Store<{ mouse: { x: number; y: number } }>,
    private trailService: TrailService
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.trackingEnabled = !this.trackingEnabled;
    if (this.trackingEnabled) {
      this.startTracking();
    } else {
      this.stopTracking();
    }
  }

  private startTracking(): void {
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

  private stopTracking(): void {
    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.stopTracking();
  }
}
