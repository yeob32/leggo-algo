import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftSider extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState( { collapsed } );
  };

  render() {
    const sessionReducer = this.props.sessionReducer;
    const gameReducer = this.props.gameReducer;

    const memberComponent = gameReducer.members.map( member => (
      <Menu.Item key={member.id}>
        {member.name} {member.host ? (
          <Icon
            type="star"
            theme="filled"
          />
) : ''}
      </Menu.Item>
    ) );

    return (
      <Sider
        theme="light"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        reverseArrow
      >
        <div className="logo" />
        <Menu
          theme="light"
          defaultSelectedKeys={[ '1' ]}
          defaultOpenKeys={[ 'sub1', 'sub2' ]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={(
              <span>
                <Icon type="user" />
                <span>my</span>
              </span>
)}
          >
            <Menu.Item key={`sub1_${ sessionReducer.id }`}>{sessionReducer.name}</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={(
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
)}
          >
            {memberComponent}
          </SubMenu>
          <SubMenu
            key="sub3"
            title={(
              <span>
                <Icon type="user" />
                <span>watch</span>
              </span>
)}
          >
            <Menu.Item key="sub3">watch users</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default connect( state => state )( LeftSider );
