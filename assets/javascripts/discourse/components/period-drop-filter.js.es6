import computed from 'ember-addons/ember-computed-decorators';

export default Ember.Component.extend({
  classNames: ['bullet'],
  period: 'all',
  expanded: false,

  @computed('expanded')
  expandedIcon(expanded) {
    return expanded ? 'd-drop-expanded' : 'd-drop-collapsed';
  },

  @computed('period')
  clickEventName() {
    return "click.period-drop-" + (this.get('period') || "all");
  },

  actions: {
    changePeriod(p) {
      this.sendAction('action', p);
      this.set('period', p);
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
