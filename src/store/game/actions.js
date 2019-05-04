export const UPDATE = 'UPDATE';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const updateStatus = payload => {
  return { type: UPDATE, payload };
};

export const getCurrentUser = payload => {
  return { type: GET_CURRENT_USER, payload };
};
