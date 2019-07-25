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
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
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
  var start = Date.now();
  var solutionCount = 0; //fixme
  var queenBoard = new Board({'n':n});
  var queenCounter = 0;
  var possiblePos = Math.pow(n, 2);
  console.log(`finding solutions for n = ${n}`);
  var recurseFunc = function(board, startPos) {
    for (let i = startPos; i < possiblePos; i++) {
      board.togglePiece(Math.floor(i / n), i % n);
      queenCounter++;
      if (!board.hasAnyQueenConflictsOn(Math.floor(i / n), i % n)) {

        if (queenCounter === n) {
          // return queenBoard;
          solutionCount++;
        } else {
          recurseFunc(board, i + 1);
        }

        // return recurseFunc(queenBoard, i + 1);
      }
      board.togglePiece(Math.floor(i / n), i % n);
      queenCounter--;
    }

  }
  recurseFunc(queenBoard, 0);
  var end = Date.now() - start;

  console.log('Number of solutions for ' + n + ' queens:', n === 1 ? 1 : solutionCount);
  console.log(`Done, took ${end} ms to find ${n <= 1 ? 1 : solutionCount}`);
  return n <= 1 ? 1 : solutionCount;
};
