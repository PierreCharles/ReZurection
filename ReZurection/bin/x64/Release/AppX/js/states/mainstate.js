 var MainState = function () { };

    MainState.prototype = {

        preload: function ()
        {
            game.load.image('logo', 'assets/images/logo.png');
            game.load.image('progress', 'assets/images/progress_bar/progress_bar.png');
            game.load.image('progress_bdr', 'assets/images/progress_bar/progress_bar_bdr.png');
            game.load.script('splash.js', 'js/states/splash.js', function () { console.log('splash.js has been loaded.'); });
        },

        create: function ()
        {
            window.addEventListener("resize", function () {
                var height = window.innerHeight;
                var width = window.innerWidth;
                game.width = width;
                game.height = height;
                game.world.width = width;
                if (game.renderType === Phaser.WEBGL) {
                    game.renderer.resize(width, height);
                }
            }, false);

            game.state.add('load', load);
            game.state.start('load');
        }
    };