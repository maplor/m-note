'use client';

import localforage from 'localforage';
import type { NoteItem } from '@/type';

const LOCAL_KEY = 'm-note-list';

const store = {
  getAll() {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY).then(function(list) {
      console.log('getall', list);
      return list || [];
    }).catch(function(err) {
      console.error('getall', err);
      return [] as NoteItem[];
    });
  },
  add(newItem: NoteItem) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY).then(function(list) {
      const currentList = list || [];

      return localforage.setItem(LOCAL_KEY, [newItem, ...currentList]);
    }).catch(function(err) {
      return [] as NoteItem[];
    });
  },
  deleteById(id: string) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY).then(function(list) {
      const currentList = list || [];

      const newList = currentList.filter((item) => {
        return item.id !== id;
      });

      return localforage.setItem(LOCAL_KEY, newList);
    }).catch(function(err) {
      return [] as NoteItem[];
    });
  },
  setFinishById(id: string, finish: boolean) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY).then(function(list) {
      const currentList = list || [];

      const newList = currentList.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          finish,
        };
      });

      return localforage.setItem(LOCAL_KEY, newList);
    }).catch(function(err) {
      return [] as NoteItem[];
    });
  },
};

export default store;
