"use strict";

var Rezurection = Rezurection || {};

Rezurection.CoinManager = function (game, resolver, nbCoins) {

    Phaser.Group.call(this, game);
    this.collisionManagedObjects = game.add.group();
    this.enableBody = true;

    for (var i = 0; i < nbCoins; i++) {
        this.add(
            new Rezurection.Coin(game, Math.floor(
                Math.random() * resolver.height) * CASE_SIZE * NB_CASE + (Math.floor(Math.random() * (NB_CASE - 1)) + 1) * CASE_SIZE,
                    Math.floor(Math.random() * resolver.width) * CASE_SIZE * NB_CASE + (Math.floor(Math.random() * (NB_CASE - 1)) + 1) * CASE_SIZE)
                        ).body.immovable = true;
    }

   


    Object.defineProperty(this, 'coinSound', { value: game.add.audio('coin_sound'), writable: false });
    var oldUpdate = this.update;
};

Rezurection.CoinManager.prototype = Object.create(Phaser.Group.prototype);
Rezurection.CoinManager.prototype.constructor = Rezurection.CoinManager;

Rezurection.CoinManager.prototype.update = function () {
    game.physics.arcade.overlap(this.collisionManagedObjects, this, this.getCoins, null, this);
};

Rezurection.CoinManager.prototype.getCoins = function(player, coin){
    this.coinSound.play();
    player.score = coin.value;
    coin.kill();
} 

Rezurection.CoinManager.prototype.manageCollisionsWith = function (player) {
    this.collisionManagedObjects.add(player);
}

Rezurection.CoinManager.prototype.stopmManagingCollisionsWith = function (player) {
    this.collisionManagedObjects.remove(player);
}


Rezurection.Coin = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'coin');
    this.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], Math.random()*2 +12, true);
    setTimeout(function(self){self.animations.play('spin')},500 * Math.random(), this);
    this.autoCull = true;
    Object.defineProperty(this, 'value', { value: 10, writable: false });
}
Rezurection.Coin.prototype = Object.create(Phaser.Sprite.prototype);
Rezurection.Coin.prototype.constructor = Rezurection.Coin;

