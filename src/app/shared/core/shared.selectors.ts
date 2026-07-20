import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SHARED_FEATURE_KEY, SharedState } from './shared.reducer';

const sharedData = createFeatureSelector<SharedState>(SHARED_FEATURE_KEY);

export const isLoading = createSelector(sharedData, (state) => state.loading);
