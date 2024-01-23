import styles from '@/app/page.module.scss';
import CourseSearch from './course-search';

export default function Forum() {
    return (
        <main className={styles.main}>
            <h1>SCORES</h1>
            <div>
                <h2>Course Search</h2>
                <p>Find the course you are playing by entering the course name below</p>
                
                <CourseSearch />
            </div>
        </main>
    )
}