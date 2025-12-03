import { CalendarDate } from '../types';

export const formatDateForApi = (date: Date): { year: string; dateStr: string } => {
  const year = date.getFullYear().toString();
  // Month is 0-indexed in JS
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return {
    year,
    dateStr: `${month}${day}`
  };
};

export const getCalendarDate = (date: Date): CalendarDate => {
  return {
    year: date.getFullYear().toString(),
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    day: date.getDate().toString().padStart(2, '0'),
    fullDate: date
  };
};

export const isValidDate = (d: any): boolean => {
  return d instanceof Date && !isNaN(d.getTime());
};
