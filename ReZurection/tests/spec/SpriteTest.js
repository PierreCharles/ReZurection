/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

describe("REZURECTION ALL SPRITES TESTS :", function () {

    it("Instanciate BombSprite with null arguments", function () {
        expect(function () {
            new Rezurection.BombSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate BulletSprite with null arguments", function () {
        expect(function () {
            new Rezurection.BulletSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate CoinSprite with null arguments", function () {
        expect(function () {
            new Rezurection.CoinSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate DoorSprite with null arguments", function () {
        expect(function () {
            new Rezurection.DoorSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate GenericSprite with null arguments", function () {
        expect(function () {
            new Rezurection.GenericSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate PlayerSprite with null arguments", function () {
        expect(function () {
            new Rezurection.PlayerSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate SimpleBulletSprite with null arguments", function () {
        expect(function () {
            new Rezurection.SimpleBulletSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate WallSprite with null arguments", function () {
        expect(function () {
            new Rezurection.WallSprite(null);
        }).toThrowError("Argument cannot be null.");
    });

    it("Instanciate ZombieSprite with null arguments", function () {
        expect(function () {
            new Rezurection.ZombieSprite(null);
        }).toThrowError("Argument cannot be null.");
    });
});