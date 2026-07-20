export interface Alert {
  id: number;
  title: string;
  descriptionHtml: string;
  typeId: number;
  typeName: string;
  badgeBg: string;
  badgeText: string;
  effect: string | null;
  effectiveDate: string;
  expirationDate: string | null;
  routeNames: string[];
  isSystemWide: boolean;
}

export interface AlertType {
  id: number;
  name: string;
  textColor: string;
  backgroundColor: string;
}

export type FilterValue = number | 'all';

export interface FilterOption {
  value: FilterValue;
  label: string;
}

export interface RawActivePeriod {
  start: string;
  end: string | null;
}

export interface RawInformedEntity {
  routeId?: string;
}

export interface RawAlert {
  id: number;
  headerText: string;
  descriptionText: string;
  alertTypeId: number;
  alertType: string;
  alertTypeColor: string;
  alertTypeTextColor: string;
  effect: string | null;
  activePeriods: RawActivePeriod[];
  informedEntities: RawInformedEntity[];
  routeNames: string[];
  isSystemWide: boolean;
}

export interface RawAlertListResponse {
  items: RawAlert[];
  totalCount: number;
  totalPages: number;
}
