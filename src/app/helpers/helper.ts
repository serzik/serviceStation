import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export const timeMask = [/\d/, /\d/, '.', /\d/, /\d/];
export const dateMask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/];

@Injectable()
export class Helper {
  public validateTime(control: AbstractControl) {
    if (control.value) {
      let validity = moment(control.value, 'HH.mm').isValid();
      return validity ? null : { invalid: true };
    }
  }

  public validateDate(control: AbstractControl) {
    if (control.value) {
      let validity = moment(control.value, 'DD.MM.YYYY').isValid();
      return validity ? null : { invalid: true };
    }
  }

  public validateDateTime(date: string, time: string) {
    let inputTime = moment(date+ ' ' + time, 'DD.MM.YYYY HH.mm').valueOf();
    let validTime = moment().add(1, 'h').valueOf();
    if (inputTime > validTime) {
      return {seconds: Math.round(inputTime/1000), error: false}
    } else {
      return {seconds: null, error: true}
    }
  }

  public parseDate(dateTime: number) {
    return dateTime ? moment(dateTime * 1000).format('DD.MM.YYYY') : null;
  }

  public parseTime(dateTime: number) {
    return dateTime ? moment(dateTime * 1000).format('HH.mm') : null;
  }

  public parseDateTime(dateTime: number) {
    moment.locale('ru');
    return moment(dateTime * 1000).format('D MMMM, dddd | HH-mm');
  }
}