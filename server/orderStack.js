const express = require( 'express' );
const app = express();

const user = [ 'kim', 'lee', 'park', 'jeong' ];

let count = 10;
let order = 0;

while ( count > 0 ) {
  turnProcess();
}

function turnProcess() {
  if ( count > 0 ) {
    const currentOrderUser = user[order];

    console.log(
      'order > %s , currentOrderUser > %s, restCount > %s ',
      order,
      currentOrderUser,
      count,
    );

    turnOver();
  }
}

function turnOver() {
  order += 1;
  if ( order > user.length - 1 ) {
    order = 0;
  }

  count -= 1;
}

app.listen( 3000, function() {
  console.log( 'Example app listening on port 3000!' );
} );
