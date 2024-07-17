import { createReducer, on } from '@ngrx/store';
import { setCoordinates } from './mouse.actions';

export const initialState = { x: 0, y: 0 };

export const mouseReducer = createReducer(
  initialState,
  on(setCoordinates, (state, { x, y }) => ({ x, y }))
);
