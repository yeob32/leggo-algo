const webpack = require( 'webpack' );
const configFactory = require( '../config/webpack.config' );

const config = configFactory( 'production' );

console.log( 'process.env >', process.env );

function build( previousFileSizes ) {
  console.log( 'Creating an optimized production build...' );

  const compiler = webpack( config );
  return new Promise( ( resolve, reject ) => {
    compiler.run( ( err, stats ) => {
      // console.log('stats > ', stats);

      let messages;
      if ( err ) {
        if ( !err.message ) {
          return reject( err );
        }
        messages = err.message;
      } else {
        // stats.toJson({ all: false, warnings: true, errors: true })
        messages = '에러가 발생하지는 않았다....?';
      }
      if (
        process.env.CI &&
        ( typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false' ) &&
        messages.warnings.length
      ) {
        console.log(
          '그라라라라라라라그라라라라라라라그라라라라라라라그라라라라라라라' +
            '\nTreating warnings as errors because process.env.CI = true.\n' +
            'Most CI servers set it automatically.\n',
        );
        return reject( new Error( messages.warnings.join( '\n\n' ) ) );
      }

      const resolveArgs = {
        stats,
        warnings: messages.warnings,
      };

      console.log( 'messages > ', messages );

      return resolve( resolveArgs );
    } );
  } );
}

build();
