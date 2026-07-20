import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stripHtml' })
export class StripHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined, maxLength = 160): string {
    if (!value) return '';
    const text = value
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, ' ')
      .trim();
    return maxLength > 0 && text.length > maxLength
      ? text.slice(0, maxLength).trimEnd() + '…'
      : text;
  }
}
