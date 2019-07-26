/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var start = Date.now();
  var rookBoard = new Board({'n':n});
  var rookCounter = 0;
  var possiblePos = Math.pow(n, 2);
  var solution = undefined; //fixme
  var recurseFunc = function(board, startPos) {
    for (let i = startPos; i < possiblePos; i++) {
      board.togglePiece(Math.floor(i / n), i % n);
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
        board.togglePiece(Math.floor(i / n), i % n);
      } else {
        rookCounter++;
        if (rookCounter === n) {
          return board;
        }
        return recurseFunc(board, i + 1);

      }
    }
  }
  var solution = recurseFunc(rookBoard, 0);
  var arrArr = [];
  for (var i = 0; i < n; i++) {
    arrArr.push(solution.get(i));
  }
  var end = Date.now() - start;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  console.log(`Done, took ${end} ms`);
  return arrArr;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var rookBoard = new Board({'n':n});
  var rookCounter = 0;
  var possiblePos = Math.pow(n, 2);
  var recurseFunc = function(board, startPos) {
    for (let i = startPos; i < possiblePos; i++) {
      board.togglePiece(Math.floor(i / n), i % n);
      rookCounter++;
      if (!board.hasAnyRooksConflictsOn(Math.floor(i / n), i % n)) {

        if (rookCounter === n) {
          // return rookBoard;
          solutionCount++;
        } else {
          recurseFunc(board, i + 1);
        }

        // return recurseFunc(rookBoard, i + 1);
      }
      board.togglePiece(Math.floor(i / n), i % n);
      rookCounter--;
    }

  }
  recurseFunc(rookBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', n === 1 ? 1 : solutionCount);
  return n === 1 ? 1 : solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  console.log(n);
  var queenBoard = new Board({'n':n});
  var queenCounter = 0;
  var possiblePos = Math.pow(n, 2);
  var solution = undefined; //fixme
  var recurseFunc = function(startPos) {
    for (let i = startPos; i < possiblePos; i++) {
      queenBoard.togglePiece(Math.floor(i / n), i % n);
      queenCounter++;
      if (!queenBoard.hasAnyQueenConflictsOn(Math.floor(i / n), i % n)) {
        if (queenCounter === n) {
          break;
        }

        recurseFunc(i + 1);
        if (queenCounter === n) {
          break;
        }
      }
      queenBoard.togglePiece(Math.floor(i / n), i % n);
      queenCounter--;
    }
  }
  recurseFunc(0);
  var arrArr = [];
  console.log(queenBoard.attributes);
  if (n !== 0 ) {
    for (var i = 0; i < n; i++) {
      arrArr.push(queenBoard.get(i));
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(queenBoard));
  return arrArr;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var rowOcc = [];
  var colOcc = [];
  var MDOcc = {};
  var mDOcc = {};
  var solutionCount = 0;
  var queenCounter = 0;
  var populate = function(n) {
    for (var i = 0; i < n; i++) {
      rowOcc.push(0);
      colOcc.push(0);
    }
    //Major population
    for (var i = (n - 2) * -1 ; i <= n - 2; i++) {
      MDOcc[i] = 0;
    }
    //minor population
    for (var i = 1; i <= (2 * n ) - 3; i++) {
      mDOcc[i] = 0;
    }
  }
  var isConflict = function(row, col) {
    //Purpose: For any given (row, col) position, will tell you if it has a conflict with another queen
    if (rowOcc[row] === 1) {
      return true;
    } else if (colOcc[col] === 1) {
      return true;
    } else if (MDOcc[col - row] === 1) {
      return true;
    } else if (mDOcc[col + row] === 1) {
      return true;
    }
    return false;
  }
  var populateNextPossiblePos = function(row, col) {
    // Purpose: For any given (row, col) position, will return an array of possible positions on the next row
    // get array of positions on next row that do not have conflicts
    // no conflicts, push to arr
    // return arr
    var nextRowPosArr = [];
    var nextRow = row + 1;

    for (var i = 0; i < n; i++) {
      if (!isConflict(nextRow, i)) {
        nextRowPosArr.push(i + (n * nextRow));
      }
    }
    return nextRowPosArr;
  }
  populate(n);
  var recurseFunc = function(possiblePosArr) {
    possiblePosArr.forEach(function(position) {
      // console.log(`evaluating position ${position}`);
      var row = Math.floor(position / n);
      var col = position % n;
      if (!isConflict(row, col)) {
        
        queenCounter++;
        // console.log(`No conflict at ${position}, current # of queens on board ${queenCounter}`);

        if (queenCounter === n) {
          solutionCount++;
        } else {
          
          rowOcc[row] = 1;        // Marks rows, cols and diagonals as occupied
          colOcc[col] = 1;
          MDOcc[col - row] = 1;
          mDOcc[col + row] = 1;
          nextPosRow = [];

          var nextPosArr = populateNextPossiblePos(row, col);
          // console.log(`Recursing down, wheeeeeeee`);
          recurseFunc(nextPosArr);
          // console.log(`Came back out the recursion hole`);

          rowOcc[row] = 0;    // Marks rows, cols and diagonals as unoccupied
          colOcc[col] = 0;
          MDOcc[col - row] = 0;
          mDOcc[col + row] = 0;
        }
        queenCounter--;
      }
    });
  }
  var start = Date.now();

  var initialPos = [];
  for (var i = 0; i < n; i++) {
    initialPos.push(i);
  }
  recurseFunc(initialPos);

  // var solutionCount = 0; //fixme
  // var queenBoard = new Board({'n':n});
  // var queenCounter = 0;
  // var possiblePos = Math.pow(n, 2);
  // var endPos = 0;
  // var possibleSolutions = [1,1,1,1,2,10,40,92,352,724,2680,14200,73712,365596,2279184,14772512]
  // console.log(`finding solutions for n = ${n}`);
  // var recurseFunc = function(board, startPos) {
  //   for (let i = startPos; i < startPos + n; i++) {
  //     board.togglePiece(Math.floor(i / n), i % n);
  //     queenCounter++;
  //     if (!board.hasAnyQueenConflictsOn(Math.floor(i / n), i % n)) {

  //       if (queenCounter === n) {
  //         // return queenBoard;
  //         solutionCount++;
  //         // console.log(`Solution %: `, solutionCount / possibleSolutions[n-1] * 100, `%`);
  //       } else {
  //         recurseFunc(board, (Math.floor(i / n) + 1) * n);
  //       }

  //       // return recurseFunc(queenBoard, i + 1);
  //     }
  //     board.togglePiece(Math.floor(i / n), i % n);
  //     queenCounter--;
  //   }

  // }

  // if (n > 1) {
  //   for (let i = 0; i < n; i++) {
  //     queenBoard.togglePiece(0, i);
  //     queenCounter++;
  //     recurseFunc(queenBoard, (Math.floor(i / n) + 1) * n);
  //     queenBoard.togglePiece(0, i);
  //     queenCounter--;
  //   }
  // }


  var end = Date.now() - start;

  console.log('Number of solutions for ' + n + ' queens:', n === 1 ? 1 : solutionCount);
  console.log(`Done, took ${end} ms to find ${n <= 1 ? 1 : solutionCount}`);
  return n <= 1 ? 1 : solutionCount;
};
