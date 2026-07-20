import {
  APP_INITIALIZER,
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const SVG_ICONS = [
  'calendar',
  'chevron-left',
  'chevron-right',
  'clock',
  'face-neutral',
  'triangle-alert',
] as const;

export function registerSvgIcons(
  matIconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer,
): void {
  SVG_ICONS.forEach((icon) =>
    matIconRegistry.addSvgIcon(
      icon,
      domSanitizer.bypassSecurityTrustResourceUrl(`icons/${icon}.svg`),
    ),
  );
}

export const materialProviders: (EnvironmentProviders | Provider)[] = [
  importProvidersFrom(MatIconModule),
  {
    provide: APP_INITIALIZER,
    useFactory:
      (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => () =>
        registerSvgIcons(matIconRegistry, domSanitizer),
    multi: true,
    deps: [MatIconRegistry, DomSanitizer],
  },
];
