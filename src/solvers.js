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
  var solution = undefined; //fixme
  var recurseFunc = function(board, startPos) {
    for (let i = startPos; i < possiblePos - 1; i++) {
      board.togglePiece(Math.floor(i / n), i % n);
      if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
        rookCounter++;
        if (rookCounter === n) {
          // return rookBoard;
          solutionCount++;

        } else {
          recurseFunc(board, startPos + 1);
          i++;
        }
        rookCounter--;
        // return recurseFunc(rookBoard, i + 1);
      }
      board.togglePiece(Math.floor(i / n), i % n);
    }

  }
  recurseFunc(rookBoard, 0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return n === 1 ? 1 : solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
