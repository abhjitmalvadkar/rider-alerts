import { Alert, RawAlert } from './alerts.model';

export function mapRawToAlert(raw: RawAlert): Alert {
  const period = raw.activePeriods?.[0];
  return {
    id: raw.id,
    title: raw.headerText,
    descriptionHtml: raw.descriptionText ?? '',
    typeId: raw.alertTypeId,
    typeName: raw.alertType,
    badgeBg: raw.alertTypeColor,
    badgeText: raw.alertTypeTextColor,
    effect: raw.effect ?? null,
    effectiveDate: period?.start ?? '',
    expirationDate: period?.end ?? null,
    routeNames: raw.routeNames ?? [],
    isSystemWide: raw.isSystemWide ?? false,
  };
}
