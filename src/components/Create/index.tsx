'use client';

import { useState } from 'react';
import { Input, DotLoading } from 'antd-mobile';
import { CheckOutline } from 'antd-mobile-icons';
import styles from './index.module.css';
import { useRequest } from 'ahooks';
import store from '@/store';

function uuid() {
  return Math.round(Math.random()*100000 + 100000).toString(36);
}

interface CreateProps {

}

export default function Create(props: CreateProps) {
  const [newContent, setNewContent] = useState('');
  const { loading, run: createItem } = useRequest(store.add, {
    manual: true,
    onSuccess: (result) => {
      setNewContent('');

      document.dispatchEvent(new CustomEvent('data-refresh'));
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
      <Input className={styles.input} placeholder="Take a shorthand ~" value={newContent} onChange={setNewContent} />
      <button className={styles.createBtn} onClick={handleClick} disabled={loading}>
        { loading ? <DotLoading /> : <CheckOutline /> }
      </button>
    </div>
  );
}
