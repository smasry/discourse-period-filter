import DiscoveryTopicsController from 'discourse/controllers/discovery/topics';

export default {
  name: "period-filter",

  initialize(container) {
    if (Discourse.SiteSettings.period_filter_enabled) {
      DiscoveryTopicsController.reopen({
        top: true
      });
    }
  }
};
