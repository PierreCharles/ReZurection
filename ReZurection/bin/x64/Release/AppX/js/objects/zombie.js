"use strict";

var Rezurection = Rezurection || {};

Rezurection.Zombie = function (game, position) {

    Rezurection.MovingObject.call(this, game, position, 'zombie1');

    this.walk = this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 30, true);
    this.scale = { x: 0.3, y: 0.3 };
    this.anchor.setTo(0.5, 0.5);

    this.animations.frame = 12;

    game.physics.arcade.enable(this);

    this.path = null;
    this.step = null;
    this.k = -1;
    this.time = null;

    this.enableBody = true;
    this.autoCull = true;

    this.health = 100;

    var oldUpdate = this.update;

    this.update = function () {
        oldUpdate.call(this);

        if (this.health <= 0)
            this.kill();

        if (this.k != -1) {
            var nextPoint = {
                x: Phaser.Math.catmullRomInterpolation(this.path.x, this.k),
                y: Phaser.Math.catmullRomInterpolation(this.path.y, this.k)
            };

            this.body.velocity.x = (nextPoint.x - this.position.x) << 1;
            this.body.velocity.y = (nextPoint.y - this.position.y) << 1;

            this.k += this.step;

            if (this.k > 1) {
                this.k = -1;
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            }
        }

        if (!this.body.velocity.isZero()) {
            this.animations.play('walk');

            this.rotation = game.math.angleBetweenPoints({ x: 0, y: 0 }, this.body.velocity) + Math.PI / 2;

            this.walk.speed = game.math.distance(0, 0, this.body.velocity.x, this.body.velocity.y);
        }
        else
            this.animations.frame = 12;

    }

    this.followPath = function (path) {
        if (path == null) {
            this.k = -1;
            return;
        }

        this.k = -1;

        if (!(path instanceof Array))
            throw new TypeError('path has to be an array of points.');

        this.path = { x: [], y: [] };

        var startIndex = 0;

        for (var i = 0; i < path.length; i++)
            if (this.getCase().x == path[i].x && this.getCase().y == path[i].y) {
                startIndex = i + 1;
                break;
            }

        for (var i = startIndex; i < path.length; i++) {
            this.path.x.push(path[i].x * Rezurection.MovingObject.CASE_SIZE + Rezurection.MovingObject.CASE_SIZE / 2);
            this.path.y.push(path[i].y * Rezurection.MovingObject.CASE_SIZE + Rezurection.MovingObject.CASE_SIZE / 2);
        }

        this.step = 0.04 / path.length;
        this.k = 0;
        this.time = game.time.now;
    };
}

Rezurection.Zombie.prototype = Object.create(Rezurection.MovingObject.prototype);
Rezurection.Zombie.prototype.constructor = Rezurection.Zombie;