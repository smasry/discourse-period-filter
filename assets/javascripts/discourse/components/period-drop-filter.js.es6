import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['bullet'],
  expanded: false,
  period: 'all',
  expandedIcon(expanded) {
    return expanded ? 'd-drop-expanded' : 'd-drop-collapsed';
  },

  @computed('period')
  currentPeriod() {
    let _period = this.get('period');
    _period = _period.split('/')[1];
    console.log(_period);
    return _period || this.get('period') || 'all';
  },


  showMoreUrl(period) {
    let url = '', category = this.get('category');
    if (category) {
      url = '/c/' + Discourse.Category.slugFor(category) + (this.get('noSubcategories') ? '/none' : '') + '/l';
    }
    url += '/top/' + period;
    return url;
  },

  actions: {
    changePeriod(p) {
      this.set('period', p);
      DiscourseURL.routeTo(this.showMoreUrl(p));
    },

    expand: function() {
      var self = this;
      if (this.get('expanded')) {
        this.close();
        return;
      }

      if (this.site.periods) {
        this.set('expanded', true);
      }
      var $dropdown = this.$()[0];

      this.$('a[data-drop-close]').on('click.periods-drop', function() {
        self.close();
      });

      Em.run.next(function(){
        self.$('.cat a').add('html').on(self.get('clickEventName'), function(e) {
          var $target = $(e.target),
              closest = $target.closest($dropdown);

          return (closest.length && closest[0] === $dropdown) ? true : self.close();
        });
      });
    }
  },

  close: function() {
    this.set('expanded', false);
  }
});
