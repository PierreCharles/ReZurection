var Rezurection = Rezurection || {};

Rezurection.KeyboardMousePlayerController = function (game, parent) {
    Rezurection.PlayerController.call(game, parent);

    this.keyset = null;
};

Rezurection.KeyboardMousePlayerController.prototype = Object.create(Rezurection.PlayerController.prototype);
Rezurection.KeyboardMousePlayerController.prototype.constructor = Rezurection.KeyboardMousePlayerController;

Rezurection.KeyboardMousePlayerController.prototype.VELOCITY = 300;
Rezurection.KeyboardMousePlayerController.prototype.DEFAULT_KEYSET = {
    top:    Phaser.KeyCode.Z,
    down:   Phaser.KeyCode.S,
    left:       Phaser.KeyCode.Q,
    right:      Phaser.KeyCode.D
};

Rezurection.KeyboardMousePlayerController.prototype.init = function (player, keyset) {
    this.setPlayer(player);

    this.keyset = keyset || this.DEFAULT_KEYSET;
};

Rezurection.KeyboardMousePlayerController.prototype.update = function () {
    this.checkKeys();
    this.checkMouse();
}

Rezurection.KeyboardMousePlayerController.prototype.checkKeys = function () {

    var vx = 0, vy = 0;

    vx += game.input.keyboard.isDown(this.keyset.right) ? this.VELOCITY : 0;
    vx -= game.input.keyboard.isDown(this.keyset.left) ? this.VELOCITY : 0;
    vy += game.input.keyboard.isDown(this.keyset.down) ? this.VELOCITY : 0;
    vy -= game.input.keyboard.isDown(this.keyset.top) ? this.VELOCITY : 0;

    this.setVelocity({ x: vx, y: vy });
}

Rezurection.KeyboardMousePlayerController.prototype.checkMouse = function () {
    if (!game.input.mousePointer.isDown)
        return;

    dx = game.input.mousePointer.worldX - this.player.position.x;
    dy = game.input.mousePointer.worldY - this.player.position.y;

    var norm = Math.sqrt(dx * dx + dy * dy);

    this.fire({ x: dx / norm, y: dy / norm });
};

