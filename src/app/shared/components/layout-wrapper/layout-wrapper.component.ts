import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

import { PageHeaderComponent } from '../page-header/page-header.component';
import { GlobalLoaderComponent } from '../global-loader/global-loader.component';

export interface RouteHeader {
  title: string;
  subtitle?: string;
  navLink?: string;
  navLabel?: string;
}

@Component({
  selector: 'app-layout-wrapper',
  imports: [RouterOutlet, PageHeaderComponent, GlobalLoaderComponent],
  templateUrl: './layout-wrapper.component.html',
  styleUrl: './layout-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutWrapperComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private headerData = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      startWith(null),
      map(() => this.readDeepestHeader()),
    ),
    { initialValue: this.readDeepestHeader() },
  );

  title = computed(() => this.headerData()?.title ?? '');
  subtitle = computed(() => this.headerData()?.subtitle ?? null);
  navLink = computed(() => this.headerData()?.navLink ?? null);
  navLabel = computed(() => this.headerData()?.navLabel ?? 'Back');

  private readDeepestHeader(): RouteHeader | null {
    let r = this.route;
    while (r.firstChild) r = r.firstChild;
    return (r.snapshot.data['header'] as RouteHeader | undefined) ?? null;
  }
}
