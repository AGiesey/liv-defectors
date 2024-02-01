'use client';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faTableCells, faCalendar, faCalculator } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.wrapper}>
            <nav className={styles.nav}>
                <Link href="/forum" 
                    className={`${styles.link} ${pathname.includes('forum') ? styles.active : undefined}`}>
                    
                    <FontAwesomeIcon icon={faPeopleGroup} title="Forum"/><p>Forum</p>
                </Link>
                <Link href="/scores" 
                    className={`${styles.link} ${pathname.includes('scores') ? styles.active : undefined}`}>
                    <FontAwesomeIcon icon={faTableCells} title="Scores"/><p>Scores</p>
                </Link>
                <Link href="/schedules" 
                    className={`${styles.link} ${pathname.includes('schedules') ? styles.active : undefined}`}>
                    <FontAwesomeIcon icon={faCalendar} title="Schedules"/><p>Schedules</p>
                </Link>
                <Link href="/handicap" 
                    className={`${styles.link} ${pathname.includes('handicap') ? styles.active : undefined}`}>
                    <FontAwesomeIcon icon={faCalculator} title="Handicap"/><p>Handicap</p>
                </Link>
            </nav>
        </aside>
    )
}