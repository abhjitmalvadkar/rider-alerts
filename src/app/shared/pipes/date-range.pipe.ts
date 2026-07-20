import { Pipe, PipeTransform } from '@angular/core';

function fmt(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

@Pipe({ name: 'dateRange' })
export class DateRangePipe implements PipeTransform {
  transform(start: string | null | undefined, end: string | null | undefined): string {
    if (!start) return 'Ongoing';
    return end ? `${fmt(start)} - ${fmt(end)}` : fmt(start);
  }
}
