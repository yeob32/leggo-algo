// src/store/system/actions.ts

import { SystemState, UPDATE_SESSION } from './types';

export function updateSession(newSession: SystemState) {
  return {
    type: UPDATE_SESSION,
    payload: newSession,
  };
}
