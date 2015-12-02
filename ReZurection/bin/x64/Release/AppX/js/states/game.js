var GameState = function () { };

GameState.prototype = {

    preload: function () {},

    create: function () {
        game.state.start('level', true, false, 1);
    },
};