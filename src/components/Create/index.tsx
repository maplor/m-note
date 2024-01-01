'use client';

import { useState } from 'react';
import { Input, DotLoading, Button } from 'antd-mobile';
import { CheckOutline } from 'antd-mobile-icons';
import { useRequest } from 'ahooks';
import store from '@/store';
import styles from './index.module.css';

function uuid() {
  return Math.round(Math.random() * 100000 + 100000).toString(36);
}

export default function Create() {
  const [newContent, setNewContent] = useState('');
  const { loading, run: createItem } = useRequest(store.add, {
    manual: true,
    onSuccess: (res) => {
      if (res && res.success) {
        setNewContent('');
        // 通知更新列表，这里使用简单的事件通信，复杂项目中应使用状态管理库
        document.dispatchEvent(new CustomEvent('data-refresh'));
      }
    },
  });

  function handleClick() {
    if (!newContent) {
      return;
    }

    createItem({
      id: uuid(),
      content: newContent,
      finish: false,
      createAt: Date.now(),
    });
  }

  return (
    <div className={styles.createContainer}>
      <Input
        className={styles.input}
        placeholder="快速记一笔"
        maxLength={1000}
        value={newContent}
        onChange={setNewContent}
        onEnterPress={handleClick}
      />
      <Button className={styles.createBtn} fill="none" size="mini" onClick={handleClick} disabled={loading}>
        { loading ? <DotLoading /> : <CheckOutline fontSize="1rem" /> }
      </Button>
    </div>
  );
}
