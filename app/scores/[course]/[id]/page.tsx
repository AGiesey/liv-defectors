import styles from '@/app/page.module.scss';
import { Course } from '@/types/course';
import { findCourses } from '@/api-utilities/courseApiUtilities';
import Scorecard from './scorecard';

export default async function Course({ params }: { params: { course: string, id: string } }) {
    const decodedSearchValue = decodeURIComponent(params.course);
    
    const coursesList: Course[] = await findCourses(decodedSearchValue);
    const course = coursesList
        .find((x: Course) => x._id === params.id)

    console.log("Scorecard", course);
    

    //TODO: add some error handling in case course is undefined

    return (
        <main className={styles.main}>
            <h3>{course?.name}</h3>
            {course && <Scorecard course={course} />}
        </main>
    )
}