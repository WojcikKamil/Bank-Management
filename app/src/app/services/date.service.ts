import { Injectable } from '@angular/core';

export interface DateObject {
  hour: string,
  minute: string,
  day: string,
  month: string,
  year: string,
}

@Injectable({
  providedIn: 'root',
})
export default class DateService {
  public objectifyDate(date: Date): DateObject {
    return {
      year: date.toString().substring(0, 4),
      month: date.toString().substring(5, 7),
      day: date.toString().substring(8, 10),
      hour: date.toString().substring(11, 13),
      minute: date.toString().substring(14, 16),
    };
  }

  getDayOfTheWeek(date: Date): string {
    switch (new Date(date).getDay()) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
      default: return 'Invalid input';
    }
  }

  getMonth(date: Date): string {
    switch (new Date(date).getMonth()) {
      case 1: return 'January';
      case 2: return 'February';
      case 3: return 'March';
      case 4: return 'April';
      case 5: return 'May';
      case 6: return 'June';
      case 7: return 'July';
      case 8: return 'August';
      case 9: return 'September';
      case 10: return 'October';
      case 11: return 'November';
      case 12: return 'December';
      default: return 'Invalid input';
    }
  }

  getDescriptor(date: Date): string {
    switch (new Date(date).getDay()) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      case 21: return 'st';
      case 22: return 'nd';
      case 23: return 'rd';
      case 31: return 'st';
      default: return 'th';
    }
  }
}
