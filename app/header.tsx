import styles from './header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.pageTitle}>My Golf League</h2>
        </header>
    )
}