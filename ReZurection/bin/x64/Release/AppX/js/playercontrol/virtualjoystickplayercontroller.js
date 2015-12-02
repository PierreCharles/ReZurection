var Rezurection = Rezurection || {};

Rezurection.VirtualJoystickPlayerController = function (game, parent) {
    Rezurection.PlayerController.call(game, parent);

    this.stick1 = game.plugins.add(
        Phaser.Plugin.VirtualJoystick,
        0,
        0,
        this.BASE_SIZE,
        this.STICK_SIZE,
        this.LIMIT,
        this.BASE_COLOR,
        this.STICK_COLOR
     );

    this.invertStick = false;
    this.player = null;

    game.scale.onSizeChange.add(this.resize, this);
};

Rezurection.VirtualJoystickPlayerController.prototype = Object.create(Rezurection.PlayerController.prototype);
Rezurection.VirtualJoystickPlayerController.prototype.constructor = Rezurection.VirtualJoystickPlayerController;

Rezurection.VirtualJoystickPlayerController.prototype.BASE_SIZE = 80;
Rezurection.VirtualJoystickPlayerController.prototype.STICK_SIZE = 70;
Rezurection.VirtualJoystickPlayerController.prototype.LIMIT = 50;
Rezurection.VirtualJoystickPlayerController.prototype.BASE_COLOR = 'rgba(128,128,128,0.5)';
Rezurection.VirtualJoystickPlayerController.prototype.STICK_COLOR = 'rgba(255,255,255,0.5)';
Rezurection.VirtualJoystickPlayerController.prototype.OFFSET = 150;
Rezurection.VirtualJoystickPlayerController.prototype.MIN_SPEED = 100;
Rezurection.VirtualJoystickPlayerController.prototype.MAX_SPEED = 300;

Rezurection.VirtualJoystickPlayerController.prototype.init = function (player, invertStick) {
    this.setPlayer(player);
    this.invertStick = !!invertStick;
    this.resize();

    this.stick1.start();
};

Rezurection.VirtualJoystickPlayerController.prototype.getStickRightX = function () {
    return game.scale.width - this.OFFSET;
};

Rezurection.VirtualJoystickPlayerController.prototype.getStickLeftX = function () {
    return this.OFFSET;
};

Rezurection.VirtualJoystickPlayerController.prototype.getSticksY = function () {
    return game.scale.height - this.OFFSET;
};

Rezurection.VirtualJoystickPlayerController.prototype.update = function () {
    
    var force = this.stick1.getForce();

    var fireDirection;

    if (force == 0) {
        this.setVelocity({ x: 0, y: 0 });
        fireDirection = this.getFireDirection(game.input.pointer1);
    }  else {
        var orientation = this.stick1.getOrientation();
        var speed = (this.MAX_SPEED - this.MIN_SPEED) * force + this.MIN_SPEED;
        this.setVelocity({ x: orientation.x * speed, y: orientation.y * speed });
        fireDirection = this.getFireDirection(game.input.pointer2);
    };

    if (fireDirection != null)
        this.fire(fireDirection);
}

Rezurection.VirtualJoystickPlayerController.prototype.getFireDirection = function (pointer) {
    if (!pointer.isDown)
        return null;

    dx = pointer.worldX - this.player.position.x;
    dy = pointer.worldY - this.player.position.y;

    var norm = Math.sqrt(dx * dx + dy * dy);

    return { x: dx / norm, y: dy / norm };
};

Rezurection.VirtualJoystickPlayerController.prototype.resize = function () {
    if (this.invertStick) {
        this.stick1.setLocation(this.getStickRightX(), this.getSticksY());
    }
    else {
        this.stick1.setLocation(this.getStickLeftX(), this.getSticksY());
    }
};

