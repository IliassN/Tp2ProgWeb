import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'special',
  standalone: true
})
export class SpecialPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';

    const date = new Date(value);

    // Formater la date avec le mois/jour/année et heure minute seconde + AM/PM
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    };

    return date.toLocaleDateString('en-US', options);
  }
}
