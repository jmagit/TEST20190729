import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'toComaDecimal'
})
export class ToComaDecimalPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (typeof (value) === 'number') {
      value = value.toString();
    }
    if (typeof (value) === 'string') {
      return value.replace(/\./g, ',');
    }
    return value;
  }
}

@Pipe({
  name: 'localnumber'
})
export class LocalDecimalPipe implements PipeTransform {
  transform(value: any, locale: string = 'es ', digits: string = '1.0-14'): any {
    if (value === '' || isNaN(value) || !isFinite(value)) { return value; }
    const tr = new DecimalPipe(locale);
    return tr.transform(value, digits);
  }
}

export const PIPES_NUMERICOS = [ ToComaDecimalPipe, LocalDecimalPipe ];
