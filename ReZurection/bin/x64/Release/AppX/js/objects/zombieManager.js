Rezurection = Rezurection || {};

Rezurection.ZombieManager = function (game, map)
{
    var zombies = game.add.group();
    zombies.enableBody = true;
    zombies.collideWorldBounds = true;

    var zombieIndex = 0;

    var lastTime = -1;
    var updateTime;

    var updatePath = function (player) {
        var z = zombies.getAt(zombieIndex);
        z.followPath(null);

        z.followPath(map.getPath(z.getCase().x, z.getCase().y, player.getCase().x, player.getCase().y));

        zombieIndex = (zombieIndex + 1) % zombies.length;
    };

    var onZombieMove = function (oldCase, newCase) {
        map.notifyZombieMove(oldCase, newCase);
    };

    this.addZombies = function (number) {
        for (var i = 0; i < number; i++) {
            var z = new Rezurection.Zombie(game, map.getAcceptableCase());
            z.caseChanged.add(onZombieMove);
            z.caseChanged.dispatch(null, z.getCase());
            zombies.add(z);
        }
    };

    this.getZombies = function () {
        return zombies;
    };

    this.start = function (t) {
        updateTime = t;
        lastTime = game.time.time;
    };

    this.stop = function () {
        lastTime = -1;
    };

    this.update = function (player) {
        //zombies.forEach(function (zombie) {
        //    zombie.body.enable = zombie.inCamera;
        //});

        game.physics.arcade.collide(player, zombies);
        //game.physics.arcade.collide(zombies);

        if (lastTime == -1)
            return;

        var currentTime = game.time.time;

        if (currentTime - lastTime < updateTime)
            return;

        lastTime = currentTime;

        updatePath(player);
    };
}