"use strict";

var game;

window.onload = function() {

    

    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.WEBGL);

    game.state.add('main_state',  MainState);
    game.state.start('main_state');
};

