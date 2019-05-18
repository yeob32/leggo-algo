import React, { ReactNode } from 'react';

import { Layout } from 'antd';

import Header from '../Header';
import Footer from '../Footer';
import RightSider from '../RightSider';

import { existSocket } from '../../utils/socketUtil';

const { Content } = Layout;

const MainStructure = ( { children } ) => {
  const { key } = children;
  const useWrapper = key ? '' : 'loginForm';

  existSocket();

  const wrapperComponent = useWrapper ? (
    <Layout>
      <Header />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content>{children}</Content>
          <Footer />
        </Layout>
        <RightSider />
      </Layout>
    </Layout>
  ) : (
    <Layout>
      <Content>{children}</Content>
    </Layout>
  );

  return wrapperComponent;
};

export default MainStructure;
