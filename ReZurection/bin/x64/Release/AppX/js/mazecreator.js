"use strict";

/**
 * Namespace
 */
var Maze = Maze || {};

/**
 * A cell of a maze.
 * Properties :
 * -> path : the actual path of this cell.
 * -> row : the row of this cell.
 * -> col : the column of this cell.
 */
Maze.Cell = function (row, col) {

    this.path = null;
    
    var p = new Maze.Path();
    p.addCell(this);

    Object.defineProperty(this, 'row', { value: row, writable: false });
    Object.defineProperty(this, 'col', { value: col, writable: false });
};

/**
 * A wall between two cells.
 * properties :
 * -> cell1 : the first cell of this wall.
 * -> cell2 : the second cell of this wall.
 */
Maze.Wall = function (cell1, cell2) {

    Object.defineProperty(this, 'cell1', { value: cell1, writable: false });
    Object.defineProperty(this, 'cell2', { value: cell2, writable: false });
};

Maze.Wall.prototype.isVertical = function () {
    return this.cell1.col < this.cell2.col;
}

Maze.Wall.prototype.isHorizontal = function (){
    return !this.isVertical;
}

/**
 * A path in the maze.
 * Properties :
 * -> addCell(cell: Maze.cell) : add a cell in this path and change its property path.
 * -> getCell(index: number) : get a cell at a specific index.
 * -> length() : get the number of cells in this path.
 */
Maze.Path = function () {

    var cells = new Array();

    this.addCell = function (cell)
    {
        if (!(cell instanceof Maze.Cell))
            throw new Error('Argument hase to be an instance of Maze.Cell');

        cell.path = this;
        cells.push(cell);
    };

    this.getCell = function (index)
    {
        if (index < 0 || index >= this.length())
            throw new Error("Index out of range.");

        return cells[index];
    };

    this.length = function ()
    {
        return cells.length;
    };
};

/**
 * The definition of a maze.
 * Properties :
 * -> height : the number of rows in this maze.
 * -> width : the number of columns in this maze.
 * -> closedWalls : the list of the closedWalls in this maze.
 */
Maze.Definition = function (height, width, closedWalls)
{
    Object.defineProperty(this, 'height', { value: height, writable: false });
    Object.defineProperty(this, 'width', { value: width, writable: false });
    Object.defineProperty(this, 'closedWalls', { value: closedWalls, writable: false });
}

/**
 * An object allowing to create a maze.
 * Properties :
 * -> create(height : number, width : number) : create a maze of size height x width and return its definition.
 */
Maze.Creator = function () {
    
    var initCells = function(height, width)
    {
        var cells = new Array(height);

        for (var i=0; i<height; i++) {
            cells[i] = new Array(width);
            for (var j=0; j<width; j++)
                cells[i][j] = new Maze.Cell(i, j);
        }

        return cells;
    };

    var initWalls = function (height, width) {

        var walls = new Array();
        var cells = initCells(height, width);

        for (var i=0; i<cells.length-1; i++)
            for (var j=0; j < cells[0].length-1; j++) {
                walls.push(new Maze.Wall(cells[i][j], cells[i][j + 1]));
                walls.push(new Maze.Wall(cells[i][j], cells[i + 1][j]));
            }

        for (var i = 0; i < cells.length - 1; i++)
            walls.push(new Maze.Wall(cells[i][cells[0].length - 1], cells[i + 1][cells[0].length - 1]));

        for (var j = 0; j < cells[0].length - 1; j++)
            walls.push(new Maze.Wall(cells[cells.length-1][j], cells[cells.length-1][j+1]));
        
        return walls;
    }

    this.create = function (height, width) {

        var closedWalls = initWalls(height, width);

        var mn_1 = height * width - 1;
        var maxClosedWalls = closedWalls.length;

        while (maxClosedWalls - closedWalls.length < mn_1) {

            var wallIndex = Math.floor(Math.random() * closedWalls.length);
            var wall = closedWalls[wallIndex];

            if (wall.cell1.path != wall.cell2.path) {

                var p = wall.cell2.path;

                for (var i = 0; i < p.length() ; i++)
                    wall.cell1.path.addCell(p.getCell(i));

                closedWalls.splice(wallIndex, 1);
            }
        }

        return new Maze.Definition(height, width, closedWalls);
    }
};

