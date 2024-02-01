import styles from './header.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.pageTitle}>Liv Defectors</h2>
        </header>
    )
}