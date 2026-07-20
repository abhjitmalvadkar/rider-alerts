import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-screen',
  imports: [RouterLink],
  templateUrl: './not-found-screen.component.html',
  styleUrl: './not-found-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundScreenComponent {}
