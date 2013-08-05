var Snake = Snake || {};

(function(app){

  app.Timer = function() {
    var self = {
          ready: true,
          fps: null
        },
        handle = {},
        frameRate = 1000 / app.state.fps,
        interval = 0,
        counter = 0,
        longest = 0,
        shortest = Infinity,
        paused = false;

    self.init = function() {
      app.events.register(handle);
      refresh();
    };

    self.start = function() {
      requestAnimationFrame(loop);
      self.ready = false;
    };

    self.stop = function() {
      counter = 0;
    };

    self.increase = function() {
      frameRate -= (1000 / app.state.fps) / app.state.fps * app.state.fpsToIncrease;
    };

    handle.pause = function() {
      if (paused) {
        paused = false;
        self.start();
      } else {
        paused = true;
        self.stop();
      }
    };

    handle.score = function() {
      // every set number of points go faster
      if (app.state.score % (app.state.scorePointValue * app.state.pointsToIncreaseSpeed) === 0) {
        self.increase();
      }
    };

    handle.reset = function() {
      self.stop();
      paused = false;
      frameRate = 1000 / app.state.fps;
      self.ready = true;
      refresh();
    };

    handle.gameover = function() {
      self.stop();
    };

    // private ----------------------------------

    function loop(time) {
      var elapsed = time - interval;

      // frame
      interval = time;
      frame(elapsed);

      if (!paused) {
        setTimeout(function() {
          requestAnimationFrame(loop);
        }, frameRate);
      }
    };

    function frame(elapsed) {

      // track fps
      if (counter > 2) {
        longest = Math.max(longest, elapsed);
        shortest = Math.min(shortest, elapsed);
      }

      self.fps = {
        cur: Math.round((1000 / elapsed) * 100) / 100,
        min: Math.round((1000 / longest) * 100) / 100,
        max: Math.round((1000 / shortest) * 100) / 100
      };

      counter++;

      if (frameRate > 40) {
        // audio can't render faster frame rates
        app.audio.play('step');
      }

      // advance frame
      if (counter % app.state.fpm === 0) {
        app.controller.move();
      }

      // rotate every frame
      if (counter % 1 === 0) {
        // app.renderer.rotate(1);
      }

      // every second
      if (counter % app.state.fps === 0) {
        // app.controller.addPoint();
      }

      // lengthen the player every second
      if (elapsed > 10000) {
        // app.player.length += 10;
        // app.controller.addPoint();
      }

      refresh();

    };

    function refresh() {
      app.grid.make();
      app.renderer.draw();
      app.display.update();
    }

    self.init();

    return self;
  };

})(Snake);