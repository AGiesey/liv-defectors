import styles from '@/app/page.module.scss';
import { findCourses } from '@/api-utilities/courseApiUtilities';
import CoursesList from './courses-list';

export default async function Course({ params }: { params: { course: string } }) {
    const decodedSearchValue = decodeURIComponent(params.course);
    const coursesList = await findCourses(decodedSearchValue);

    return (
        <main className={styles.main}>
            <h1>Scores</h1>
            <h3 className={styles.sectionTitle}>Your seach of <span>{decodedSearchValue}</span> resulted in the following courses:</h3>
            <p>Select your course from the list below to go to the scorecard.</p>
            {coursesList.length && <CoursesList courses={coursesList}/>}
        </main>
    )
}