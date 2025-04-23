const navMenuConfig = require('../../03-molecules/20-nav-menu/nav-menu.config');

module.exports = {
  context: {
    ...navMenuConfig.context,

    title: 'Lorem inpsum sit dolar amet',
    homeUrl: '#not-expected'
  },

  variants: [
    {
      name: 'Homepage',
      context: {
        homeUrl: '#expected'
      }
    }
  ]
};
