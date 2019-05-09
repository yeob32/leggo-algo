export const UPDATE = 'game/UPDATE';

export const updateStatus = data => {
  return { type: UPDATE, data };
};
