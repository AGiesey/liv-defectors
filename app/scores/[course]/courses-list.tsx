"use client";
import {Course} from '@/types/course';
import { useRouter, usePathname } from 'next/navigation';

export default function CoursesList({courses}: {courses: Course[]}) {
    const router = useRouter();
    const path = usePathname();

    const goToCourseScorecard = (e: React.MouseEvent<HTMLLIElement>) => {
        console.log('e', e.currentTarget.id);
        router.push(`${path}/${e.currentTarget.id}`)
    }
    return (
        <ul>
            {courses && courses.map(course => (
                <li onClick={goToCourseScorecard} key={course._id} id={course._id}>{course.name}: {course.city}, {course.state}</li>
            ))}
        </ul>
    )
}