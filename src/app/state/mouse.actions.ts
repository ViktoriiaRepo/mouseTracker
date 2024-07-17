import { createAction, props } from '@ngrx/store';

export const setCoordinates = createAction(
  '[Mouse] Set Coordinates',
  props<{ x: number; y: number }>()
);
