export const UPDATE = 'UPDATE';

export const updateStatus = data => {
  return { type: UPDATE, data };
};
