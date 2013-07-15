var SnakeGame = SnakeGame || {};

(function(app){

  app.Bot = function(options) {

    var self = new app.Member(options);

    $.extend(self, {
      size: [1, 1],
      length: app.state.length,
      turnChance: 0.90
    });

    // implements ai
    self.ai = $.extend({}, app.ai);

    self.die = function() {
      app.audio.kill();
      app.state.score += app.state.killPointValue;
      self.trigger('death', [self.id]);
    };

    self.init();

    return self;
  };

})(SnakeGame);