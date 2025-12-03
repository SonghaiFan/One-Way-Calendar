export interface CalendarDate {
  year: string;
  month: string;
  day: string;
  fullDate: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
