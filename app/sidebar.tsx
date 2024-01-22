'use client';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.scss';
import Link from 'next/link';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.wrapper}>
            <nav className={styles.nav}>
                <Link href="/forum" 
                    className={`${styles.link} ${pathname.includes('forum') ? styles.active : undefined}`}>
                    Forum
                </Link>
                <Link href="/scores" 
                    className={`${styles.link} ${pathname.includes('scores') ? styles.active : undefined}`}>
                    Scores
                </Link>
                <Link href="/schedules" 
                    className={`${styles.link} ${pathname.includes('schedules') ? styles.active : undefined}`}>
                    Schedules
                </Link>
                <Link href="/handicap" 
                    className={`${styles.link} ${pathname.includes('handicap') ? styles.active : undefined}`}>
                    Handicap
                </Link>
            </nav>
        </aside>
    )
}