'use client';
import styles from '../page.module.scss';
import {useState} from 'react';
import {findCourses} from '@/api-utilities/courseApiUtilities';
import {Course} from '@/types/course';

export default function Forum() {
    const [search, setSearch] = useState<string>('');
    const [courses, setCourses] = useState<Course[]>([]);

    const fetchCourses = () => {
        if (search.length < 1) {
            //TODO: display error;
            return;
        }
        findCourses(search)
            .then((courses: Course[]) => {setCourses(courses)})
    }

    return (
        <main className={styles.main}>
            <h1>SCORES</h1>

            <div className={styles.searchCourses}>
                <h2>Course Search</h2>
                <p>Find the course you are playing by entering the course name below</p>
                <div>
                    <label htmlFor="courseSearch">Course Name</label>
                    <input type="text" id="courseSearch" value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <button onClick={fetchCourses}>Search</button>
                </div>
                <div>
                    <ul>
                        {courses && courses.map(course => (
                            <li key={course._id}>{course.name}: {course.city}, {course.state}</li>
                        ))}
                    </ul>
                    
                </div>
            </div>

        </main>
    )
}