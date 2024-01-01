'use client';

import localforage from 'localforage';
import { Toast } from 'antd-mobile';
import { FrownOutline } from 'antd-mobile-icons';
import type { NoteItem } from '@/type';

const LOCAL_KEY = 'm-note-list';

function showError() {
  Toast.show({
    content: '后台开小差了',
    icon: <FrownOutline />,
  });
}

/**
 * 使用本地存储模拟接口，直接返回对应的数据格式
 * */
const store = {
  getAll() {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        return list || [];
      })
      .catch(showError);
  },
  add(newItem: NoteItem) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        const currentList = list || [];

        return localforage.setItem(LOCAL_KEY, [newItem, ...currentList]);
      })
      .catch(showError);
  },
  deleteById(id: string) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        const currentList = list || [];

        const newList = currentList.filter((item) => {
          return item.id !== id;
        });

        return localforage.setItem(LOCAL_KEY, newList);
      })
      .catch(showError);
  },
  setFinishById(id: string, finish: boolean) {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
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
      })
      .catch(showError);
  },
};

export default store;
