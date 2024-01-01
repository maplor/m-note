import List from '../components/List';
import Create from '@/components/Create';
import styles from './page.module.css';

export default function MNote() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🎉 m-note 🎉</h1>
      </header>
      <main className={styles.main}>
        <List />
      </main>
      <footer className={styles.footer}>
        <Create />
      </footer>
    </div>
  )
}
