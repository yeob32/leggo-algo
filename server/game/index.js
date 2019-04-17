const cardData = require( './cardData' );

const game = {
  status: 'ready',
  deal: false,
  cards: [],
  discardHolder: [], //
  pileCards: [], // 남은 카드
  members: [],
};

module.exports = game;
