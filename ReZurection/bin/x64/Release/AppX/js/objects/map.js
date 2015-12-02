﻿"use strict";

var Rezurection = Rezurection || {};

/**
 * Represente a level map.
 * This structure is a grid where each case has a certain weight.
 * A wall has a weight of 0 (= infinity).
 * This is the core of the path finding mecanisme.
 */
Rezurection.Map = function (maze) {

    if (!(maze instanceof Maze.Definition))
        throw new Error('maze has to be an instance of Maze.Definition');

    var graph = Rezurection.Map.graphFromMazeDefinition(maze);

    /**
     * Give a case wich is not a wall;
     */
    this.getAcceptableCase = function () {
        var ret;

        do {
            ret = { y: ret = Math.floor(Math.random() * this.height()), x: Math.floor(Math.random() * this.width()) };
        }
        while (graph.grid[ret.x][ret.y].weight != 1);

        return ret;
    }

    /**
     * Called by ZombieManager when a zombie move.
     * It allow to not have a heap of zombie following the player
     * by adding weight to cases when zombies are on them,
     * so the path finding avoid overloaded cases.
     */
    this.notifyZombieMove = function (oldCase, newCase) {

        if (oldCase !== null)
            graph.grid[oldCase.x][oldCase.y].weight -= 5;

        graph.grid[newCase.x][newCase.y].weight += 5;
    };

    /**
     * Get the path between two given points.
     * return : An array of node (see astar.Node) representing the founded path or null.
     */
    this.getPath = function (fromX, fromY, toX, toY) {
        return astar.search(graph, graph.grid[fromX][fromY], graph.grid[toX][toY], { heuristic: astar.heuristics.diagonal, closest: false });
    }

    /**
     * The width (in case) of the map.
     */
    this.width = function () { return graph.width; }

    /**
     * The height (in cases) of the map.
     */
    this.height = function (){ return graph.height;}
};

/**
 * A constant representing the size (in case) of a maze cell.
 */
Rezurection.Map.CELL_SIZE = 5;


/**
 * Convert a Maze.Definition into a Rezurection.Graph by filling the appropriate cases.
 */
Rezurection.Map.graphFromMazeDefinition = function (mazeDefinition) {
    var rows = mazeDefinition.height * Rezurection.Map.CELL_SIZE + 2;
    var cols = mazeDefinition.width * Rezurection.Map.CELL_SIZE + 2;

    var graph = new Rezurection.Graph(cols, rows, { diagonal: true, cornerCutting: false });

    //Borders
    graph.fill(0, 0, cols - 1, 1, 0);
    graph.fill(0, rows - 1, cols - 1, 1, 0);
    graph.fill(0, 0, 1, rows - 1, 0);
    graph.fill(cols - 1, 0, 1, rows - 1, 0);

    //Walls inside
    mazeDefinition.closedWalls.forEach(function (wall) {
        if (wall.isVertical())
            graph.fill(wall.cell1.col * Rezurection.Map.CELL_SIZE + Rezurection.Map.CELL_SIZE,
                wall.cell1.row * Rezurection.Map.CELL_SIZE + 1,
                1,
                Rezurection.Map.CELL_SIZE,
                0);
        else
            graph.fill(wall.cell1.col * Rezurection.Map.CELL_SIZE,
                wall.cell1.row * Rezurection.Map.CELL_SIZE + Rezurection.Map.CELL_SIZE,
                Rezurection.Map.CELL_SIZE + 1,
                1,
                0);
    });

    return graph;
};

