/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

describe("REZURECTION PLAYERDATA TEST :", function () {

    var player;

    beforeEach(function () {
        try { player = new Rezurection.PlayerData("player",10); }
        catch (ex) { console.log(ex); }
    });

    it("Instanciate PlayerData with null arguments", function () {
        expect(function () {
            new Rezurection.PlayerData(null);
        }).toThrowError("PlayerData arguments cannot be null");
    });

    it("Test StartLife cannot be negative", function () {
        expect(function () {
            new Rezurection.PlayerData("Player", -10);
        }).toThrowError("Start life cannot be negative");
    });

    it("Test PlayerData zombies killed", function () {
        expect(player.killedZombies).toEqual(0);
    });

    it("Test PlayerData method add zombies killed", function () {
        player.addKilledZombies(1);
        expect(player.killedZombies).toEqual(1);
    });

    it("Test PlayerData method add negative value zombies killed", function () {
        expect(function () {
            player.addKilledZombies(-10);
        }).toThrowError("Value cannot be negative");
    });

    it("Test PlayerData currentWeapon", function () {
        expect(player.currentWeapon).toEqual("gun");
    });

    it("Test PlayerData startLife", function () {
        expect(player.startLife).toEqual(10);
    });

    it("Test PlayerData name", function () {
        expect(player.name).toEqual("player");
    });

    it("Test PlayerData wallet", function () {
        expect(player.wallet).toEqual(0);
    });

    it("Test PlayerData method add value to wallet", function () {
        player.addWallet(100);
        expect(player.wallet).toEqual(100);
    });

    it("Test PlayerData method sub value to wallet", function () {
        try {
            player.addWallet(100);
            player.subWallet(100);
        }
        catch (ex) { console.log(ex); }
        expect(player.wallet).toEqual(0);
    });

    it("Test PlayerData method add negative value wallet", function () {
        expect(function () {
            player.addWallet(-10);
        }).toThrowError("Value cannot be negative");
    });

    it("Test PlayerData method sub negative value wallet", function () {
        expect(function () {
            player.subWallet(-10);
        }).toThrowError("Value cannot be negative");
    });

    it("Test PlayerData method sub superior value wallet to wallet", function () {
        expect(function () {
            player.subWallet(10);
        }).toThrowError("Cannot subdvide value to wallet");
    });

});