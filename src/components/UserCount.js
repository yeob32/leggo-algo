import React, { useState, useEffect } from 'react';

import axios from 'axios';

const UserCount = () => {
  const [ user, setUser ] = useState( [] );
  useEffect( () => {
    // getUsers();
    setUser( [] );
  } );

  const getUsers = async () => {
    console.log( 'asdsd' );
    // const result = await axios.get( 'http://localhost:3001/users' );
    // setUser(result.data);
    setUser( [] );
  };

  return <div>접속중인 유저 : {JSON.stringify( user )}</div>;
};

export default UserCount;
