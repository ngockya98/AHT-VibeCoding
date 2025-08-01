import { mockLogin } from './mockApi';

export const login = async (code: string) => {
  // TODO: Replace mockLogin with real Firebase logic
  return mockLogin(code);
};
