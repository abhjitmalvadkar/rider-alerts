import { createAction } from '@ngrx/store';

const CLEAR_STATE = '[shared] clear state';
export const ClearState = createAction(CLEAR_STATE);

const START_LOADING = '[shared] start loading';
export const StartLoading = createAction(START_LOADING);

const STOP_LOADING = '[shared] stop loading';
export const StopLoading = createAction(STOP_LOADING);

const CLEAR_LOADING = '[shared] clear loading';
export const ClearLoading = createAction(CLEAR_LOADING);
