import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { FetchAlertDetailsRequest } from '../core/alerts.action';
import { alertDetails } from '../core/alerts.selectors';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

interface MetaItem {
  icon?: string;
  iso?: string;
  format?: string;
  text?: string;
  ongoing?: boolean;
  separator?: boolean;
}

@Component({
  selector: 'app-alert-details-screen',
  imports: [DatePipe, RouterLink, SafeHtmlPipe, MatIcon],
  templateUrl: './alert-details-screen.component.html',
  styleUrl: './alert-details-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDetailsScreenComponent implements AfterViewInit {
  private store = inject(Store);

  id = input.required<number, unknown>({ transform: numberAttribute });

  alert = this.store.selectSignal(alertDetails);

  metaItems = computed<MetaItem[]>(() => {
    const a = this.alert();
    if (!a) return [];
    const items: MetaItem[] = [];
    if (a.effectiveDate) {
      items.push({ icon: 'calendar', iso: a.effectiveDate, format: 'd/M/yy' });
      items.push({ icon: 'clock', iso: a.effectiveDate, format: 'h:mm a' });
    }
    items.push({ separator: true, text: '–' });
    if (a.expirationDate) {
      items.push({ icon: 'calendar', iso: a.expirationDate, format: 'd/M/yy' });
      items.push({ icon: 'clock', iso: a.expirationDate, format: 'h:mm a' });
    } else {
      items.push({ text: 'N/A', ongoing: true });
    }
    return items;
  });

  @ViewChild('titleEl') titleEl?: ElementRef<HTMLElement>;

  constructor() {
    effect(() => {
      const id = this.id();
      if (Number.isFinite(id)) {
        this.store.dispatch(FetchAlertDetailsRequest({ id }));
      }
    });

    effect(() => {
      if (this.alert()) {
        queueMicrotask(() => this.titleEl?.nativeElement?.focus());
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.alert()) this.titleEl?.nativeElement?.focus();
  }
}
