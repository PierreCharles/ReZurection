Resolver = function (maze) {

    // Tests arguments
    if (arguments[0] == null || arguments.length < 1) {
        throw new Error("Resolver need to maze for instanciate object"); return;
    }

    var pile = new Array();
    Object.defineProperty(this, 'height', { value: maze.height, writable: false });
    Object.defineProperty(this, 'width', { value: maze.width, writable: false });
    Object.defineProperty(this, 'wallsMatrix', { value: initResolvedMatrix(maze), writable: false });
    Object.defineProperty(this, 'resolvedMatrix', { value: creatEmptyTable(maze), writable: false });
    Object.defineProperty(this, 'pilePosition', { value: pile, writable: false });

    /*
    * Define new matrix table with ID wall
    * 0 is empty, 1 is vertical, 2 is horizontal and 3 is horizontal+vertical  (bottom and right case wall)
    */
    function initResolvedMatrix(maze) {
        var solved = creatEmptyTable(maze);
        maze.closedWalls.forEach(function (wall) {
            if (wall.isVertical())  solved[wall.cell1.row][wall.cell1.col] += 1;
            else solved[wall.cell1.row][wall.cell1.col] += 2;
        });
        return solved;
    }

    /*
    * Initialisation new matrix table[rows][cols]
    * return new table to rows * cols set to 0
    */
    function creatEmptyTable(maze) {
        var table = new Array(maze.height);
        for (var i = 0; i < maze.height ; i++) {
            table[i] = new Array(maze.width);
            for (var j = 0; j < maze.width; j++) table[i][j] = 0;
        }   
        return table;
    }
}

/*
*  Recursive function to get best resolution maze root
*  sp : start Position
*  ep : end Position
*  this function generate a matrix (size rows and cols maze) with case set to 1 for the path
*/
Resolver.prototype.findPath = function (sp, ep) {
    if (arguments[0] == null || arguments[1] == null || arguments.lenght<2) return false;
    if (sp.x < 0 || sp.x > ep.x || sp.y < 0 || sp.y > ep.y || this.resolvedMatrix[sp.x][sp.y] == 1) return false; 
    this.resolvedMatrix[sp.x][sp.y] = 1;
    this.pilePosition.push(sp);
    if (sp.x == ep.x && sp.y == ep.y) return true;
    if (this.wallsMatrix[sp.x][sp.y] != 2 && this.wallsMatrix[sp.x][sp.y] != 3 && this.findPath(new Position(sp.x + 1, sp.y), new Position(ep.x, ep.y))) return true;
    if (this.wallsMatrix[sp.x][sp.y] != 1 && this.wallsMatrix[sp.x][sp.y] != 3 && this.findPath(new Position(sp.x, sp.y + 1), new Position(ep.x, ep.y)))  return true; 
    if ((sp.x-1>=0 && sp.y>=0) && this.wallsMatrix[sp.x - 1][sp.y] != 2 && this.findPath(new Position(sp.x - 1, sp.y), new Position(ep.x, ep.y)))  return true;
    if ((sp.x >= 0 && sp.y -1 >= 0) && this.wallsMatrix[sp.x][sp.y - 1] != 1 && this.findPath(new Position(sp.x, sp.y - 1), new Position(ep.x, ep.y))) return true;
    this.resolvedMatrix[sp.x][sp.y] = 0;
    this.pilePosition.pop();
    return false;
}


/*
* function to generate a resolved maze matrix
* startPosition : start Position 
* endPosition : end Position
* return a pile Position
*/
Resolver.prototype.generate = function (startPosition, endPosition) {
    this.findPath(startPosition, endPosition);
    //this.showLogs();
    return this.pilePosition;
}

/*
* function to show matrix log 
*/
Resolver.prototype.showLogs = function () {
    var string = "";
    var count = 0;
    for (var i = 0; i < this.height; i++){
        for (var j = 0; j < this.width; j++) string += this.wallsMatrix[i][j];
        string += "\t";
        for (var j = 0; j < this.width; j++) string += this.resolvedMatrix[i][j];
        string += "\n";
    }
    this.pilePosition.forEach(function (p) {
        string += "\n" + p.x+ "\t" + p.y;
        count++;
    }, this);
    string += "\n"+count;
    console.log(string);
}

