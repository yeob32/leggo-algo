const express = require( 'express' );
const path = require( 'path' );
const sessionStore = require( '../session/sessionStore' );

const router = express.Router();

// router.get( '/*', function( req, res ) {
//   res.sendFile( path.join( process.cwd(), 'public', 'index.html' ) );
// } );

router.post( '/login', function( req, res ) {
  const id = req.body.id;
  const name = req.body.name;
  const password = req.body.password;

  const userCheck = sessionStore.getSessionList().some( ss => ss.id === id );

  if ( userCheck ) {
    res.json( { code: '400', message: 'fail', detail: 'aleady signed' } );
  } else {
    const result = sessionStore.saveSession( { id, name } );
    console.log( 'result > ', result );
    res.json( { code: '200', message: 'success', test: 'test!!! ', session: result } );
  }

  // => redis
  // if ( req.session.rds.some( ss => ss.id === id ) ) {
  //   res.json( { code: '400', message: 'fail', detail: 'aleady signed' } );
  // } else {
  //   req.session.rds.push( { id, name } );
  //   res.json( { code: '200', message: 'success', session: { id } } );
  // }
} );

router.get( '/users', function( req, res ) {
  res.json( { session: req.session } );
} );

router.get( '/logout', function( req, res ) {
  req.session.destroy( function( err ) {
    // cannot access session here
    res.json( { message: 'logout' } );
  } );
} );

module.exports = router;
