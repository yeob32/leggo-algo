const express = require( 'express' );
const path = require( 'path' );

const router = express.Router();

router.get( '/test', function( req, res ) {
  const id = req.query.id;
  const name = req.query.name;
  if ( req.session.rds.some( ss => ss.id === id ) ) {
    res.json( { code: '400', message: 'fail', detail: 'aleady signed' } );
  } else {
    req.session.rds.push( { id, name } );
    res.json( { code: '200', message: 'success' } );
  }
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

module.exports = function( app ) {};
