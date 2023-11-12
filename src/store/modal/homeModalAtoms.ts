import { atom } from 'recoil';
export const homeModalState = atom({
  key: 'homeModalState',
  default: false,
});

export const postModalState = atom({
  key: 'postModalState',
  default: false,
});

export const editModalState = atom({
  key: 'editModalState',
  default: false,
});
