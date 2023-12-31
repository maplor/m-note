'use client';

import { Checkbox } from 'antd-mobile';
import { CloseOutline } from 'antd-mobile-icons';
import styles from './index.module.css';

interface ItemProps {
  finish: boolean;
  content: string;
}

export default function Item(props: ItemProps) {
  const { finish, content } = props;
  return (
    <div className={styles.item}>
      <Checkbox checked={finish} />
      <span className={styles.content}>{content}</span>
      <button className={styles.delBtn}>
        <CloseOutline />
      </button>
    </div>
  );
}
