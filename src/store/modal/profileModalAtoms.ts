import { atom } from 'recoil';
export const profileEidtState = atom<string | null>({
  key: 'profileEidtState',
  default: null,
});
