var Rezurection = Rezurection || {};

Player = function (game, position)
{
    Rezurection.MovingObject.call(this, game, position, 'player');
    this.walk = this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 30, true);
    this.animations.add('walk_reverse', [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 30, true);
    this.anchor.setTo(0.5, 0.5);

    var wallet = 0;
    Object.defineProperty(this, 'score', {
        get: function () {  return wallet; },
        set: function (value) { wallet += value; textCoin.setText('Coins: '+wallet); }
    });

    this.animations.frame = 12;

    game.physics.arcade.enable(this);

    this.enableBody = true;

    this.weapon = new Rezurection.Weapon(game, 200);

    var oldUpdate = this.update;

    this.update = function ()
    {
        oldUpdate.call(this);

        if (!this.body.velocity.isZero()) {
            this.animations.play('walk');

            this.rotation = game.math.angleBetweenPoints({ x: 0, y: 0 }, this.body.velocity) + Math.PI / 2;

            this.walk.speed = game.math.distance(0, 0, this.body.velocity.x, this.body.velocity.y) >> 2;
        }
        else
            this.animations.frame = 12;
    }

}

Player.prototype = Object.create(Rezurection.MovingObject.prototype);
Player.prototype.constructor = Player;

Player.prototype.fire = function (direction) {
    this.weapon.fire(this.position, direction);
};