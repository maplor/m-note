'use client';

import { Input } from 'antd-mobile';
import { CheckOutline } from 'antd-mobile-icons';
import styles from './index.module.css';

interface CreateProps {

}

export default function Create(props: CreateProps) {
  const { } = props;
  return (
    <div className={styles.createContainer}>
      <Input className={styles.input} placeholder="Take a shorthand ~" />
      <button className={styles.createBtn}>
        <CheckOutline />
      </button>
    </div>
  );
}
