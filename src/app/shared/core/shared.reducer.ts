import { createReducer, on } from '@ngrx/store';

import { ClearLoading, ClearState, StartLoading, StopLoading } from './shared.actions';

export const SHARED_FEATURE_KEY = 'shared';

export interface SharedState {
  loading: number[];
}

const initialState: SharedState = {
  loading: [],
};

export const SharedReducer = createReducer(
  initialState,
  on(ClearState, () => ({ ...initialState })),
  on(StartLoading, (state) => ({ ...state, loading: [...state.loading, 1] })),
  on(StopLoading, (state) => ({ ...state, loading: [...state.loading].slice(1) })),
  on(ClearLoading, (state) => ({ ...state, loading: [] })),
);
