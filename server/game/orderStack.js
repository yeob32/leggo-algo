const Game = require( './index' );

const currentMembers = Game.members;

const count = Game.pileCards.length; //
let order = 0;

// TEST
function turnProcess() {
  if ( count > 0 ) {
    const currentOrderUser = currentMembers[order];

    console.log(
      'order > %s , currentOrderUser > %s, restCount > %s ',
      order,
      currentOrderUser,
      count,
    );

    turnOver();

    return currentOrderUser;
  }
}

function turnOver() {
  order += 1;
  if ( order > currentMembers.length - 1 ) {
    order = 0;
  }
}
