export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
}

// src/store/system/types.ts
export const UPDATE_SESSION = 'UPDATE_SESSION';

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction;
