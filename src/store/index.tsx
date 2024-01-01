'use client';

import { ReactNode } from 'react';
import localforage from 'localforage';
import { Toast } from 'antd-mobile';
import { FrownOutline } from 'antd-mobile-icons';
import type { NoteItem } from '@/type';

const LOCAL_KEY = 'm-note-list';
const MAX_SAVE_LENGTH = 1000;
const tooMuchTip = <p style={{ textAlign: 'center' }}>记录太多啦！<br />请先删除部分笔记</p>;

function showError(msg?: ReactNode) {
  Toast.show({
    content: msg || '后台开小差了',
    icon: <FrownOutline />,
  });
}

function handleError() {
  showError();
  return {
    success: false,
  };
}

type StoreResult<T = any> = {
  success: boolean;
  data?: T;
};

/**
 * 使用本地存储模拟接口，直接返回对应的数据格式
 * */
const store = {
  getAll(): Promise<StoreResult<NoteItem[]>> {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        return {
          success: true,
          data: list || [],
        };
      })
      .catch(handleError);
  },
  add(newItem: NoteItem): Promise<StoreResult<undefined>> {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        const currentList = list || [];

        if (currentList.length >= MAX_SAVE_LENGTH) {
          showError(tooMuchTip);
          return {
            success: false,
          };
        }

        return localforage.setItem(LOCAL_KEY, [newItem, ...currentList])
          .then(() => {
            return {
              success: true,
            };
          });
      })
      .catch(handleError);
  },
  deleteById(id: string): Promise<StoreResult<undefined>> {
    return localforage.getItem<NoteItem[]>(LOCAL_KEY)
      .then(function(list) {
        const currentList = list || [];

        const newList = currentList.filter((item) => {
          return item.id !== id;
        });

        return localforage.setItem(LOCAL_KEY, newList)
          .then(() => {
            return {
              success: true,
            };
          });
      })
      .catch(handleError);
  },
  setFinishById(id: string, finish: boolean): Promise<StoreResult<undefined>> {
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

        return localforage.setItem(LOCAL_KEY, newList)
          .then(() => {
            return {
              success: true,
            };
          });
      })
      .catch(handleError);
  },
};

export default store;
