
Floor = function (game, x, y, width, height) {
    Phaser.TileSprite.call(this, game, x, y, height, width, 'floor');
}

Floor.prototype = Object.create(Phaser.TileSprite.prototype);
Floor.prototype.constructor = Floor;

