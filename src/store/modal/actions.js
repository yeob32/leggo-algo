export const TOGGLE = 'game/TOGGLE';

export const toggleModal = visible => {
  console.log( 'visible > ', visible );
  return { type: TOGGLE, visible };
};
