var Rezurection = Rezurection || {};

Rezurection.PlayerController = function (game, parent) {

    Phaser.Plugin.call(this, game, parent);

    this.player = null;

    this.hasPreRender = false;
    this.hasRender = false;
    this.hasPostRender = false;
    this.hasPreUpdate = true;
    this.hasPostUpdate = false;
    this.visible = false;

    Rezurection.PlayerController.velocityAlreadySetted = false;
};

Rezurection.PlayerController.prototype = Object.create(Phaser.Plugin.prototype);
Rezurection.PlayerController.prototype.constructor = Rezurection.PlayerController;

Rezurection.PlayerController.velocity = null;

Rezurection.PlayerController.prototype.setPlayer = function(player)
{
    this.player = player;
}

Rezurection.PlayerController.prototype.preUpdate = function () {

    Rezurection.PlayerController.velocityAlreadySetted = false;
};

Rezurection.PlayerController.prototype.setVelocity = function (velocity) {

    if (Rezurection.PlayerController.velocityAlreadySetted && velocity.x == 0 && velocity.y == 0)
        return;

    this.player.body.velocity.x = velocity.x;
    this.player.body.velocity.y = velocity.y;

    Rezurection.PlayerController.velocityAlreadySetted = true;
};

Rezurection.PlayerController.prototype.fire = function (direction) {
    this.player.fire(direction);
};