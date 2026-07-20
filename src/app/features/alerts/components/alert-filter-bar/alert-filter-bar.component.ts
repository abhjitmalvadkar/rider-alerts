import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { FilterOption, FilterValue } from '../../core/alerts.model';

@Component({
  selector: 'app-alert-filter-bar',
  imports: [MatIcon],
  templateUrl: './alert-filter-bar.component.html',
  styleUrl: './alert-filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertFilterBarComponent {
  options = input.required<FilterOption[]>();
  active = input.required<FilterValue>();
  filterChange = output<FilterValue>();

  @ViewChildren('tab') tabs?: QueryList<ElementRef<HTMLButtonElement>>;

  startIndex = signal(0);

  private viewportWidth = signal(typeof window !== 'undefined' ? window.innerWidth : 1280);

  pageSize = computed(() => {
    const w = this.viewportWidth();
    if (w >= 1280) return 5;
    if (w >= 960) return 4;
    if (w >= 600) return 3;
    return 2;
  });

  visibleOptions = computed(() =>
    this.options().slice(this.startIndex(), this.startIndex() + this.pageSize()),
  );

  canPrev = computed(() => this.startIndex() > 0);
  canNext = computed(() => this.startIndex() + this.pageSize() < this.options().length);
  showNav = computed(() => this.options().length > this.pageSize());

  constructor() {
    effect(() => {
      const max = Math.max(0, this.options().length - this.pageSize());
      if (this.startIndex() > max) this.startIndex.set(max);
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewportWidth.set(window.innerWidth);
  }

  isActive(v: FilterValue): boolean {
    return this.active() === v;
  }

  select(v: FilterValue): void {
    if (v !== this.active()) this.filterChange.emit(v);
  }

  prev(): void {
    this.startIndex.update((i) => Math.max(0, i - this.pageSize()));
  }
  next(): void {
    this.startIndex.update((i) =>
      Math.min(Math.max(0, this.options().length - this.pageSize()), i + this.pageSize()),
    );
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const list = this.tabs?.toArray() ?? [];
    if (list.length === 0) return;
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % list.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + list.length) % list.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = list.length - 1;
    else return;
    event.preventDefault();
    list[next]?.nativeElement.focus();
  }
}
