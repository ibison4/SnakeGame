(function(app){

  app.start = (function() {

    var self = {};

    self.init = function() {
      app.state.init();
      // app.colors.init();
      app.menu.init();
      app.audio.init();
      app.input.init();
      app.digitizer.init();
    };

    self.newgame = function() {
      // removes an existing game events
      app.events.deregister('game');

      app.stage = new app.Stage();
      app.grid = new app.Grid();
      app.points = new app.Points();
      app.powerups = new app.Powerups();

      app.cast = new app.Cast([
        'borders',
        'players',
        'obstacles',
        'bots'
      ]);

      app.props = new app.Props([
        'points',
        'powerups',
        'doorways'
      ]);

      app.display = new app.Display();
      app.renderer = new app.Renderer();
      app.timer = new app.Timer();
      app.controller = new app.Controller();

      app.events.trigger('reset');
    };

    $(document).ready(function() {
      self.init();
    });

    return self;

  })();

})(Snake || {});
