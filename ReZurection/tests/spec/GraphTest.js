/**
 * Auhtor : CHAMBERLAND Grégoire & CHARLES Pierre
 */

describe("REZURECTION GRAPH TEST :", function () {

    var graph;

    beforeEach(function () {
        try { graph = new Rezurection.graph(10, 10); }
        catch (ex) { console.log(ex); }
    });

    it("instanciate Graph with null arguments", function () {
        expect(function () {
            new Rezurection.Graph(null);
        }).toThrowError("Graph arguments cannot be null");
    });

    it("test Rezurection.Graph is an instance of Graph", function () {
        expect(graph instanceof Graph).toBeTruthy;
    });

});