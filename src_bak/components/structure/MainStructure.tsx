import React, { ReactNode } from 'react';

import Header from '../Header';
import Footer from '../Footer';

interface Props {
  children: ReactNode;
}

const MainStructure: React.SFC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainStructure;
