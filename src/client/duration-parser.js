export default class DurationParser {
  static parse(text) {
    var match = text.match(/^((\d+)h)?\s*((\d{1,2})m)?$/);

    if (match == null) return null;

    var hours = match[2],
        minutes = match[4];

    if (hours == undefined && minutes == undefined) return null;

    if (minutes != undefined && parseInt(minutes) >= 60) return null;

    var totalMinutes = 0;

    if (hours != undefined) totalMinutes += 60 * parseInt(hours);
    if (minutes != undefined) totalMinutes += parseInt(minutes);

    return totalMinutes;
  }

  static stringify(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60),
        minutes = totalMinutes % 60;

    return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 || hours == 0 ? minutes + 'm' : ''}`.trim();
  }
}
