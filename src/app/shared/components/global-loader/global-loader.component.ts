import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { isLoading } from '../../core/shared.selectors';

@Component({
  selector: 'app-global-loader',
  imports: [MatProgressSpinner],
  templateUrl: './global-loader.component.html',
  styleUrl: './global-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalLoaderComponent {
  private store = inject(Store);

  loading = this.store.selectSignal(isLoading);
  visible = computed(() => (this.loading()?.length ?? 0) > 0);
}
