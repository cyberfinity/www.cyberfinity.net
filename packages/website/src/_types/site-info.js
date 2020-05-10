const SiteHistoryEntry = require('./site-history-entry');

/**
 * Information about a (sub-)site.
 */
class SiteInfo {

  /**
   *
   * @param {Object} data This website's info
   * @param {SiteHistoryEntry[]} data.history Present and past locations of the website
   * @param {boolean} [data.isSubSite] Whether or not this is a sub-site
   */
  constructor({
    history,
    isSubSite = false,
  }) {
    this.history = history;
    this.isSubSite = isSubSite;
  }

  get url() {
    return this.history[0].url;
  }
}

module.exports = SiteInfo;
