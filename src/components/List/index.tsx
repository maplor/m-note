'use client';

import { Button, Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import styles from './index.module.css';
import { useRequest } from 'ahooks';
import store from '@/store';
import { useEffect } from 'react';

interface ItemProps {
  // finish: boolean;
  // content: string;
}

export default function Item(props: ItemProps) {
  const { data, run: getAll } = useRequest(store.getAll, {
    manual: true,
  });

  useEffect(() => {
    getAll();

    function handleRefresh() {
      getAll();
    }

    document.addEventListener('data-refresh', handleRefresh);

    return () => document.removeEventListener('data-refresh', handleRefresh);
  }, []);

  function handleSetFinish(id: string, checked: boolean) {
    store.setFinishById(id, checked).then(() => {
      getAll();
    });
  }

  function handleDelete(id: string) {
    store.deleteById(id).then(() => {
      getAll();
    });
  }

  if (!data) {
    return null;
  }

  return data.map((item) => {
    return (
      <div key={item.id} className={styles.item}>
        <Checkbox checked={item.finish} onChange={(v) => handleSetFinish(item.id, v)} />
        <span className={styles.content}>{item.content}</span>
        <Button className={styles.delBtn} fill="none" size="mini" onClick={() => handleDelete(item.id)}>
          <CloseOutline />
        </Button>
      </div>
    );
  });
}
