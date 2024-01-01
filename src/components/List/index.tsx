'use client';

import { Button, Checkbox, ErrorBlock, Result, Skeleton } from 'antd-mobile';
import { CloseOutline, ContentOutline } from 'antd-mobile-icons';
import styles from './index.module.css';
import { useRequest } from 'ahooks';
import store from '@/store';
import { useEffect } from 'react';

export default function Item() {
  const { loading, data, run: getAll } = useRequest(store.getAll);

  useEffect(() => {
    function handleRefresh() {
      getAll();
    }

    document.addEventListener('data-refresh', handleRefresh);

    return () => document.removeEventListener('data-refresh', handleRefresh);
  }, []);

  function handleSetFinish(id: string, checked: boolean) {
    store.setFinishById(id, checked).then((res) => {
      if (res.success) {
        getAll();
      }
    });
  }

  function handleDelete(id: string) {
    store.deleteById(id).then((res) => {
      if (res.success) {
        getAll();
      }
    });
  }

  if (!data && loading) {
    return (
      <Skeleton.Paragraph lineCount={5} animated />
    );
  }

  if (!data || !data.success) {
    return (
      <ErrorBlock status="default" />
    );
  }

  if (data && (!data.data || data.data.length === 0)) {
    return (
      <Result
        className={styles.empty}
        icon={<ContentOutline />}
        status="success"
        title="空空如也"
        description="暂时无事，休息一会吧"
      />
    );
  }


  return data.data!.map((item) => {
    return (
      <div key={item.id} className={styles.item}>
        <Checkbox className={styles.check} checked={item.finish} onChange={(v) => handleSetFinish(item.id, v)} />
        <span className={`${styles.content} ${item.finish ? styles.contentFinish : ''}`}>{item.content}</span>
        <Button className={styles.delBtn} fill="none" size="mini" onClick={() => handleDelete(item.id)}>
          <CloseOutline fontSize="1rem" />
        </Button>
      </div>
    );
  });
}
