import {Course} from '@/types/course';

export default function CoursesList({courses}: {courses: Course[]}) {
    return (
        <ul>
            {courses && courses.map(course => (
                <li key={course._id}>{course.name}: {course.city}, {course.state}</li>
            ))}
        </ul>
    )
}