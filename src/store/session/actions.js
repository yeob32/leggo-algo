export const SAVE = 'SAVE';
export const UPDATE = 'UPDATE';
export const GET = 'GET';
export const REMOVE = 'REMOVE';

export const saveSession = session => {
  return { type: SAVE, session };
};

export const getSession = () => {
  return {
    type: GET,
  };
};
