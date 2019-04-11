import React, { useState, useEffect } from 'react';

import axios from 'axios';

const UserCount = members => {
  return <div>접속중인 유저 : {JSON.stringify( members )}</div>;
};

export default UserCount;
