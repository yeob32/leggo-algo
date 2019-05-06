import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';

const ControllPanel = ( { deal, start, join, exit, host } ) => {
  const showButton = host && !deal;

  return (
    <div>
      {showButton ? (
        <Button type="primary" size="large" onClick={start} style={{ marginRight: '8px' }}>
          시작
        </Button>
      ) : (
        ''
      )}
      <Button type="primary" size="large" onClick={join} style={{ marginRight: '8px' }}>
        참가
      </Button>
      <Button type="" size="large" onClick={exit} style={{ marginRight: '8px' }}>
        나가기
      </Button>
    </div>
  );
};

// class ControllPanel extends React.Component {
//   start = () => {
//     const { auth } = this.getSessionReducer();

//     // start => 카드분배 => 턴 순회 1분 => 점수
//     socketUtil().emit('start', auth.host);
//   };

//   join = () => {
//     const { id, name, auth } = this.getSessionReducer();

//     socketUtil().emit('join', id, name);
//     socketUtil().on('member-list', data => {
//       this.props.updateGameStatus({ members: data });
//       this.saveCurrentSession();
//     });

//     if (!auth.host) {
//       // this.start();
//     }
//   };

//   render() {
//     const { host } = this.props.sessionReducer;
//     const showButton = host && !deal;

//     return (
//       <div>
//         {showButton ? (
//           <Button type="primary" size="large" onClick={start} style={{ marginRight: '8px' }}>
//             시작
//           </Button>
//         ) : (
//           ''
//         )}
//         <Button type="primary" size="large" onClick={join} style={{ marginRight: '8px' }}>
//           참가
//         </Button>
//         <Button type="" size="large" style={{ marginRight: '8px' }}>
//           나가기
//         </Button>
//       </div>
//     );
//   }
// }

// export default connect(state => state)(ControllPanel);
export default ControllPanel;
