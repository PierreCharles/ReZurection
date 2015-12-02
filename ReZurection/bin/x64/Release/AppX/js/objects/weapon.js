var Rezurection = Rezurection || {};

Rezurection.Weapon = function (game, fireRate) {
    Phaser.Group.call(this, game)

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;

    this.createMultiple(50, 'bullet1');
    this.setAll('checkWorldBounds', true);
    this.setAll('outOfBoundsKill', true);
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 0.5)

    this.fireRate = fireRate;
    this.nextFire = 0;
};

Rezurection.Weapon.prototype = Object.create(Phaser.Group.prototype);
Rezurection.Weapon.prototype.constructor = Rezurection.Weapon;

Rezurection.Weapon.prototype.fire = function (position, direction) {
    if (game.time.now > this.nextFire && this.countDead() > 0) {
        this.nextFire = game.time.now + this.fireRate;

        var bullet = this.getFirstDead();

        bullet.reset(position.x + direction.x * 40, position.y + direction.y * 40, 500);

        //var norm = game.math.distance({ x: 0, y: 0 }, direction);

        bullet.body.velocity.x = direction.x * 1000;
        bullet.body.velocity.y = direction.y * 1000;

        bullet.rotation = game.math.angleBetweenPoints({ x: 0, y: 0 }, bullet.body.velocity);
    }
};

Rezurection.Weapon.prototype.update = function () {

    game.physics.arcade.overlap(this, Rezurection.Weapon.bulletInfranchissableObjects, this.killBullet);
    game.physics.arcade.overlap(this, Rezurection.Weapon.bulletDamagedObjects, this.damageObject);
}

Rezurection.Weapon.prototype.killBullet = function (bullet) {
    bullet.kill();
};

Rezurection.Weapon.prototype.damageObject = function (bullet, object) {
    bullet.kill();
    object.health -= 50;
};

Rezurection.Weapon.bulletInfranchissableObjects = [];
Rezurection.Weapon.bulletDamagedObjects = [];

Rezurection.Weapon.addBulletInfranchissableObject = function (bulletInfranchissableObject) {
    Rezurection.Weapon.bulletInfranchissableObjects.push(bulletInfranchissableObject);
};

Rezurection.Weapon.removeBulletInfranchissableObject = function (bulletInfranchissableObject) {
    Rezurection.Weapon.bulletInfranchissableObjects.splice(bulletInfranchissableObjects.indexOf(bulletInfranchissableObject), 1);
};

Rezurection.Weapon.addBulletDamagedObject = function (bulletDamagedObject) {
    Rezurection.Weapon.bulletDamagedObjects.push(bulletDamagedObject);
};

Rezurection.Weapon.removeBulletDamagedObject = function (bulletDamagedObject) {
    Rezurection.Weapon.bulletDamagedObjects.splice(bulletDamagedObject.indexOf(bulletDamagedObject), 1);
};