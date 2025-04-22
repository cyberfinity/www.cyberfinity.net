/**
 * An approximate date, which has at least the year but
 * possibly alos a month and even a day.
 */
class ApproxDate {

  /**
   * Creates an new approximate date instance.
   *
   * @param {Object} date         The approximate date
   * @param {number} date.year    The year
   * @param {number} [date.month] The month, if known
   * @param {number} [date.day]   The day, if known
   */
  constructor({
    year,
    month,
    day
  }) {
    this.year = year;
    this.month = month;
    this.day = day;
  }

}

module.exports = ApproxDate;
