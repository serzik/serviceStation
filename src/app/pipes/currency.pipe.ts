import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'woodCurrency' })
export class WoodCurrencyPipe implements PipeTransform {
  constructor() { }
  public transform(value: number,
                   currencySign: string = ' ₽',
                   decimalLength: number = 0,
                   chunkDelimiter: string = '.',
                   decimalDelimiter: string = ',',
                   space: string = ' ',
                   chunkLength: number = 3): string {

    let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    let num = value.toFixed(Math.max(0, decimalLength));
    let price = (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
    return  price.replace(/\./g, ' ') + currencySign;
  }
}
