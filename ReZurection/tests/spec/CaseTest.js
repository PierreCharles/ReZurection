/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

describe("REZURECTION CASE TEST :", function () {

    var rezCase;

    beforeEach(function () {
        try{rezCase = new Rezurection.Case(4,4);}
        catch (ex) {console.log(ex);  }
    });

    it("Instanciate Case with null arguments", function () {
        expect(function () {
            new Rezurection.Case(null);
        }).toThrowError("Arguments x and y has to be numbers");
    });

    it("Test instance return methode toWorldPosition", function () {
        expect(rezCase.toWorldPosition() instanceof Phaser.Point).toBeTruthy;
    });

    it("Test return  values methode toWorldPosition", function () {
        expect(rezCase.toWorldPosition()).toEqual(new Phaser.Point(288,288));
    });

    it("Test instance return methode toMazePosition", function () {
        expect(rezCase.toMazePosition() instanceof Phaser.Point).toBeTruthy;
    });

    it("Test return  values methode toMazePosition", function () {
        expect(rezCase.toMazePosition()).toEqual(new Phaser.Point(0, 0));
    });

    it("Test instance return methode FromWorldPosition", function () {
        expect(Rezurection.Case.FromWorldPosition(new Phaser.Point(5,5)) instanceof Rezurection.Case).toBeTruthy;
    });

    it("Test return values methode FromWorldPosition", function () {
        expect(Rezurection.Case.FromWorldPosition(new Phaser.Point(5, 5))).toEqual(new Rezurection.Case(0, 0));
    });

    it("Use FromWorldPosition with null arguments", function () {
        expect(function () {
           Rezurection.Case.FromWorldPosition(null);
        }).toThrowError("Argument point has to be an instance of Phaser.Point");
    });
});