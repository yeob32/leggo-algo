import React, { ReactNode } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';

import Header from '../Header';
import Footer from '../Footer';

const { Content } = Layout;

const MainStructure = ( { children } ) => {
  const { key } = children;
  const useWrapper = key ? '' : 'loginForm';

  const wrapperComponent = useWrapper ? (
    <Layout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  ) : (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );

  return wrapperComponent;
};

export default MainStructure;
