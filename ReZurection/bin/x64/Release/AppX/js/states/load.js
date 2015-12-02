var load = function () {};

load.prototype = {

    loadImages: function()
    {
        game.load.spritesheet('player', 'assets/images/player/dude_sheet.png', 50, 50);
        game.load.spritesheet('zombie1', 'assets/images/zombies/zombie4.png', 128, 128);
        game.load.spritesheet('coin', 'assets/images/bonus/coin.png', 32, 32);
        game.load.image('bullet1', 'assets/images/bullets/bullet2.png');
        game.load.image('wall', 'assets/images/wall/wall.png');
        game.load.image('floor', 'assets/images/floor/floor.png');
        game.load.image('pause_button', 'assets/images/menu/pauseButton.png');
    },

    loadSounds: function() {
        game.load.audio('coin_sound', 'assets/sounds/coin.mp3', 'assets/sounds/coin.ogg');
    },

    loadFonts: function() {
        game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    },

    loadStates : function(){
        game.state.add('main_menu', MainMenu);
        game.state.add('game', GameState);
        game.state.add('level', LevelState);
    },

    init: function()
    {
        this.progressBar = game.make.sprite(game.world.centerX - 900 / 2, game.world.centerY + 50, 'progress');
        this.progressBarBdr = game.make.sprite(game.world.centerX - 900 / 2, game.world.centerY + 50, 'progress_bdr');
        this.logo = game.make.sprite(game.world.centerX, game.world.centerY - 150, 'logo');
        this.status = game.make.text(game.world.centerX, game.world.centerY + 300, 'Loading...', { fill: 'white' });

        this.logo.anchor.setTo(0.5, 0.5);
        this.status.anchor.setTo(0.5, 0.5);
    },

    preload: function ()
    {
        game.add.existing(this.logo);
        game.add.existing(this.progressBarBdr);
        game.add.existing(this.progressBar);
        game.add.existing(this.status);
        game.load.setPreloadSprite(this.progressBar);

        this.loadSounds();
        this.loadImages();
        this.loadFonts();
        this.loadStates();
    },

    create: function () {
        this.status.setText('Loading... done');
        setTimeout(function() {game.state.start('main_menu')}, 0000);
    }
};