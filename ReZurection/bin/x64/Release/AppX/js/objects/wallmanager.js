"use strict";

/**
 * Namespace.
 */
var Rezurection = Rezurection || {};

/**
 * Object responsible walls creation and collision.
 */
Rezurection.WallManager = function(game, maze, case_size, cell_size, resolver) {

    Phaser.Group.call(this, game);

    this.collisionManagedObjects = game.add.group();

    maze.closedWalls.forEach(function (wall) {

        this.add(
            wall.isVertical() ?
                new Rezurection.Wall(game, (wall.cell1.col * cell_size + cell_size) * case_size, (wall.cell1.row * cell_size + 1) * case_size, case_size, cell_size * case_size, 'wall')
	    	:
	            new Rezurection.Wall(game, wall.cell1.col * cell_size * case_size, (wall.cell1.row * cell_size + cell_size) * case_size, (cell_size + 1) * case_size, case_size, 'wall')
	        );
    }, this);

	this.add(new Rezurection.Wall(game, 0, 0, (maze.width * cell_size + 2) * case_size, case_size, 'wall'));
    this.add(new Rezurection.Wall(game, 0, (maze.width * cell_size + 1) * case_size, (maze.width * cell_size + 2) * case_size, case_size, 'wall'));
    this.add(new Rezurection.Wall(game, 0, case_size, case_size, maze.width * cell_size * case_size, 'wall'));
    this.add(new Rezurection.Wall(game, (maze.width * cell_size + 1) * case_size, case_size, case_size, maze.width * cell_size * case_size, 'wall'));

    var oldUpdate = this.update;
};

Rezurection.WallManager.prototype = Object.create(Phaser.Group.prototype);
Rezurection.WallManager.prototype.constructor = Rezurection.WallManager;

/**
 * Called before each frame render.
 */
Rezurection.WallManager.prototype.update = function () {
    
    game.physics.arcade.collide(this, this.collisionManagedObjects);
};

/**
 * Add a wall-collided object.
 */
Rezurection.WallManager.prototype.manageCollisionsWith = function (gameObject) {
    this.collisionManagedObjects.add(gameObject);
}

/**
 * Remove a wall-collided object.
 */
Rezurection.WallManager.prototype.stopmManagingCollisionsWith = function (gameObject) {
    this.collisionManagedObjects.remove(gameObject);
}


// Object Wall
Rezurection.Wall = function (game, x, y, width, height, frame) {
    Phaser.TileSprite.call(this, game, x, y, width, height, frame);

    game.physics.enable(this, Phaser.ARCADE);

    this.body.immovable = true;

    this.autoCull = true;
}

Rezurection.Wall.prototype = Object.create(Phaser.TileSprite.prototype);
Rezurection.Wall.prototype.constructor = Rezurection.Wall;

