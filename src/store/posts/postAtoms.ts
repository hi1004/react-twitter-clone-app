import { UserProps } from '@/components/follow/FollowingBox';
import { RecoilValueReadOnly, atom, selector } from 'recoil';

export interface PostProps {
  id?: string;
  email?: string;
  content?: string;
  createdAt?: string;
  uid?: string;
  photoURL?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string[];
  hashTags?: string[];
  imageUrl?: string;
  displayName?: string;
  intro?: string;
}

export const postState = atom<PostProps[]>({
  key: 'postState',
  default: [],
});

export interface PostObj {
  id?: string;
  email?: string;
  content?: string;
  createdAt?: string;
  uid?: string;
  photoURL?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string[];
  hashTags?: string[];
  imageUrl?: string;
  displayName?: string;
}

export const postObjectState: RecoilValueReadOnly<PostProps[]> = selector({
  key: 'postObjectState',
  get: ({ get }) => {
    const posts = get(postState);
    return posts || {};
  },
});

export const postDataState = atom<PostProps>({
  key: 'postDataState',
  default: {},
});

export const homeResizeState = atom({
  key: 'homeResizeState',
  default: false,
});

export const postIdState = atom<string>({
  key: 'postIdState',
  default: '',
});

export const tagState = atom<string[]>({
  key: 'tagState',
  default: [],
});
export const hashState = atom<string>({
  key: 'hashState',
  default: '',
});
export const postFollowerState = atom<UserProps[]>({
  key: 'postFollowerState',
  default: [],
});
