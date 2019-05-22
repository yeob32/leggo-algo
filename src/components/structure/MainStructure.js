import React, { useEffect, ReactNode } from 'react';

import { Layout } from 'antd';
import axios from 'axios';

import Header from '../Header';
import Footer from '../Footer';
import RightSider from '../RightSider';

import { existSocket } from '../../utils/socketUtil';

const { Content } = Layout;

const MainStructure = ( { children } ) => {
  const { key } = children;
  const useWrapper = key ? '' : 'loginForm';

  existSocket();

  // useEffect( async () => {
  //   const result = await axios.get( 'http://localhost:3001/me', {
  //     sessionId: localStorage.getItem( 'sessionId' ),
  //   } );

  //   setData( result.data );
  // } );

  // useEffect( () => {
  //   let didCancel = false;
  //   console.log( 'this is MainStructure useEfect' );

  //   async function fetchMyAPI() {
  //     let url = 'http://something/' + productId;
  //     let config = {};
  //     const response = await myFetch( url );
  //     if ( !didCancel ) {
  //       // Ignore if we started fetching something else
  //       console.log( response );
  //     }
  //   }

  //   fetchMyAPI();
  //   return () => {
  //     didCancel = true;
  //   }; // Remember if we start fetching something else
  // }, [] );

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
