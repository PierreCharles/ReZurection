var Rezurection = Rezurection || {};

Rezurection.MovingObject = function (game, pos, key) {

    if (Rezurection.MovingObject.CASE_SIZE === 0)
        throw new Error("You have to specify Rezurection.MovingObject.CASE_SIZE before instanciating a MovingObject");

    var currentCase = pos;

    Phaser.Sprite.call(this,
                        game,
                        pos.y * Rezurection.MovingObject.CASE_SIZE + Rezurection.MovingObject.CASE_SIZE / 2,
                        pos.x * Rezurection.MovingObject.CASE_SIZE + Rezurection.MovingObject.CASE_SIZE / 2,
                        key);

    this.anchor.setTo(0.5, 0.5);

    this.caseChanged = new Phaser.Signal();

    this.update = function ()
    {
        var caseX = Math.floor(this.position.x / Rezurection.MovingObject.CASE_SIZE);
        var caseY = Math.floor(this.position.y / Rezurection.MovingObject.CASE_SIZE);

        if (caseX != currentCase.x || caseY != currentCase.y)
        {
            this.caseChanged.dispatch(currentCase, { x: caseX, y: caseY });

            currentCase.x = caseX;
            currentCase.y = caseY;
        }
    }
 
    this.getCase = function()
    {
        return currentCase;
    }
};

Rezurection.MovingObject.CASE_SIZE = 0;

Rezurection.MovingObject.prototype = Object.create(Phaser.Sprite.prototype);
Rezurection.MovingObject.prototype.constructor = Rezurection.MovingObject;