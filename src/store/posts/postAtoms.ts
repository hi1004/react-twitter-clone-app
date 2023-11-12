import { atom } from 'recoil';

export interface PostProps {
  id?: string;
  email?: string;
  content?: string;
  createdAt?: string;
  uid?: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: string[];
  hashTags?: string[];
  imageUrl?: string;
}

export const postState = atom<PostProps[]>({
  key: 'postState',
  default: [],
});

export const homeResizeState = atom({
  key: 'homeResizeState',
  default: false,
});
