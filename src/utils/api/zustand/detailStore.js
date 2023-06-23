import {create} from 'zustand';

export const detailStore = create(set => ({
  title: '',

  changeTitle: newTitle => set(() => ({title: newTitle})),
}));
