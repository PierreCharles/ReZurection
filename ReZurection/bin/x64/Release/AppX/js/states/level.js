var LevelState = function () {  };

var MAP_SIZE_HEIGHT = 10;
var MAP_SIZE_WIDTH = 10;
var CASE_SIZE = 64;
var NB_CASE = 5;
var NB_COINS = 100;
var NB_ZOMBIES = 50;
var textCoin;

var w = 800, h = 600;

LevelState.prototype = {
    init: function(level) {
        this.level = level;
    },

    preload: function () {
        game.load.image('menu', 'assets/number-buttons-90x90.png', 270, 180);
    },

    create: function () {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, MAP_SIZE_WIDTH * CASE_SIZE * NB_CASE, MAP_SIZE_HEIGHT * CASE_SIZE * NB_CASE);

        var maze = new Maze.Creator().create(MAP_SIZE_WIDTH, MAP_SIZE_HEIGHT);
        this.map = new Rezurection.Map(maze);
        var resolver = new Resolver(maze);
        var pileResolved = resolver.generate(new Position(0, 0), new Position(MAP_SIZE_HEIGHT - 1, MAP_SIZE_WIDTH - 1));

        Rezurection.MovingObject.CASE_SIZE = CASE_SIZE;
       
        // Add floor on the map
        game.world.sendToBack(game.add.existing(new Floor(game, CASE_SIZE, CASE_SIZE, (this.map.width() - 1) * CASE_SIZE, (this.map.height() - 1) * CASE_SIZE)));
        // Add wallManager
        this.wallManager = new Rezurection.WallManager(game, maze, CASE_SIZE, 5, resolver);
        //Add coinManager
        this.coinManager = new Rezurection.CoinManager(game,resolver,NB_COINS);

        // Add a player
        this.player = game.add.existing(new Player(game, { x: 1, y: 1 }));
        this.player.collideWorldBounds = true;

        game.plugins.add(Rezurection.KeyboardMousePlayerController, this.player);
        if (game.device.touch)
            game.plugins.add(Rezurection.VirtualJoystickPlayerController, this.player);

        // Set camera
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.camera.bounds = new Phaser.Rectangle(0, 0, this.map.width() * CASE_SIZE, this.map.height() * CASE_SIZE);
        game.camera.follow(this.player);

        // Add information player and level text
        textCoin = game.add.bitmapText(10, 10, 'font', "Coin: " + this.player.score, 84);
        var textLevel = game.add.bitmapText(this.game.width - 250, 10, 'font', "Level: " + this.level, 84);
        var pauseButton = new Phaser.Button(game, this.game.width/2, 10, 'pause_button', this.paused());
        game.stage.addChild(textCoin);
        game.stage.addChild(textLevel);
        game.stage.addChild(pauseButton);


        
        

        this.zombieManager = new Rezurection.ZombieManager(game, this.map, this.player);
        this.zombieManager.addZombies(NB_ZOMBIES);
        this.zombieManager.start(5);

        this.wallManager.manageCollisionsWith(this.zombieManager.getZombies());
        this.wallManager.manageCollisionsWith(this.player);

        Rezurection.Weapon.addBulletDamagedObject(this.zombieManager.getZombies());
        Rezurection.Weapon.addBulletInfranchissableObject(this.wallManager);

        this.coinManager.manageCollisionsWith(this.player);


    },

    update: function () {
        this.zombieManager.update(this.player);
    },

    paused: function () {
        game.paused = true;
        choiseLabel = game.add.text(this.game.width / 2, this.game.height /2, 'Click outside menu to continue', { font: '50px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
        game.input.onDown.add(this.unpause, self);
    },

    unpause : function(event){
        if (game.paused) {
            choiseLabel.destroy();
            game.paused = false;
        }
    }
 };

