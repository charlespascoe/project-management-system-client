import DurationParser from 'client/duration-parser';

export function priorityConverter(priority) {
  switch (priority) {
    case 1:
      return 'P1 - Blocker';
    case 2:
      return 'P2 - Critical';
    case 3:
      return 'P3 - Major';
    case 4:
      return 'P4 - Minor';
    case 5:
      return 'P5 - Trivial';
    default:
      return '';
  }
}

export function durationConverter(duration) {
  return DurationParser.stringify(duration);
}

export function dateFormatter(date, format) {
  return date.toString(format);
}

