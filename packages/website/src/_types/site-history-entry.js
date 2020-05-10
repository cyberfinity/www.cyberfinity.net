const ApproxDate = require('./approx-date');

/**
 * A record of when a website was available at
 * a particular URL.
 */
class SiteHistoryEntry {

  /**
   * Creates a new site history entry.
   *
   * @param {Object} data
   * @param {string} data.url The website's URL
   * @param {ApproxDate} data.fromDate The date when the website went live at this URL
   * @param {ApproxDate} data.toDate (Optional) The date when the website stopped existing at this URL
   * @param {boolean} data.urlStillActive Whether this URL is still active and redirects to the site's current URL
   */
  constructor({
    url,
    fromDate,
    toDate,
    urlStillActive,
  }) {
    this.url = url;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.urlStillActive = urlStillActive;
  }

}

module.exports = SiteHistoryEntry;
