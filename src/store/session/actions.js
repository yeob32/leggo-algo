export const SAVE = 'game/SAVE';
export const UPDATE = 'game/UPDATE';
export const REMOVE = 'game/REMOVE';

export const INIT = 'game/INIT';

export const saveSession = session => {
  return { type: SAVE, session };
};

export const initSession = session => {
  return { type: INIT, session };
};

export function updateSession( data ) {
  return { type: UPDATE, data };
}
