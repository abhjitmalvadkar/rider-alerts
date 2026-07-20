import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alert-pagination',
  imports: [MatIcon],
  templateUrl: './alert-pagination.component.html',
  styleUrl: './alert-pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPaginationComponent {
  page = input.required<number>();
  totalPages = input.required<number>();
  total = input.required<number>();
  pageSize = input<number>(5);
  pageChange = output<number>();

  canPrev = computed(() => this.page() > 1);
  canNext = computed(() => this.page() < this.totalPages());

  rangeStart = computed(() => (this.page() - 1) * this.pageSize() + 1);
  rangeEnd = computed(() => Math.min(this.page() * this.pageSize(), this.total()));

  prev(): void {
    if (this.canPrev()) this.pageChange.emit(this.page() - 1);
  }

  next(): void {
    if (this.canNext()) this.pageChange.emit(this.page() + 1);
  }
}
