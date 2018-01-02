import DiscoveryController from 'discourse/controllers/discovery';
import DiscoveryTopicsController from 'discourse/controllers/discovery/topics';

export default {
  name: "period-filter",

  initialize(container) {
    DiscoveryTopicsController.reopen({
      top: true
    });
  }
};
