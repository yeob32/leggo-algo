import React, { ReactNode } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';

import Header from '../Header';
import Footer from '../Footer';

const { Content } = Layout;

const MainStructure = ( { children } ) => {
  return (
    <div>
      <Layout>
        <Header />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </div>
  );
};

export default MainStructure;
