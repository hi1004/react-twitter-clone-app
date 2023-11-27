import { atom } from 'recoil';
type TabType = 'my' | 'like';
type homeTabType = 'all' | 'following';

export const profileEidtState = atom<string | null>({
  key: 'profileEidtState',
  default: null,
});
export const homeTabState = atom<homeTabType>({
  key: 'homeTabState',
  default: 'all',
});

export const profileTabState = atom<TabType>({
  key: 'profileTabState',
  default: 'my',
});

export const followingIdsState = atom<string[]>({
  key: 'followingIdsState',
  default: [''],
});

export const followerIdsState = atom<string[]>({
  key: 'followerIdsState',
  default: [''],
});
