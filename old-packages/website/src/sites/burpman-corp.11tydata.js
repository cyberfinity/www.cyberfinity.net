const ApproxDate = require('../_types/approx-date');
const SiteHistoryEntry = require('../_types/site-history-entry');
const SiteInfo = require('../_types/site-info');

module.exports = {
  siteInfo: new SiteInfo({
    history: [
      new SiteHistoryEntry({
        url: 'http://burpmancorp.cyberfinity.net/',
        fromDate: new ApproxDate({
          year: 2010
        }),
      }),

      new SiteHistoryEntry({
        url: 'http://bcpuk.tripod.com/',
        fromDate: new ApproxDate({
          year: 2002
        }),
      }),

      new SiteHistoryEntry({
        url: 'http://www.tripod.com/~bcpuk/',
        fromDate: new ApproxDate({
          year: 2000
        }),
      }),
    ]
  })
};
