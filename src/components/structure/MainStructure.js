import React, { ReactNode } from 'react';

import Header from '../Header';
import Footer from '../Footer';

const MainStructure = ( { children } ) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainStructure;
