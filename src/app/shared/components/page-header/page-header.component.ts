import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-page-header',
  imports: [RouterLink, MatIcon],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string | null>(null);
  navLink = input<string | null>(null);
  navLabel = input<string>('Back');
}
