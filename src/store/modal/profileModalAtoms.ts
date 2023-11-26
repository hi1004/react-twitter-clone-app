import { atom } from 'recoil';
type TabType = 'my' | 'like';

export const profileEidtState = atom<string | null>({
  key: 'profileEidtState',
  default: null,
});
export const profileTabState = atom<TabType>({
  key: 'profileTabState',
  default: 'my',
});
