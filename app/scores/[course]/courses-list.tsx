"use client";
import {Course} from '@/types/course';
import { useRouter, usePathname } from 'next/navigation';
import { Box, Card } from 'theme-ui'

export default function CoursesList({courses}: {courses: Course[]}) {
    const router = useRouter();
    const path = usePathname();

    const goToCourseScorecard = (e: React.MouseEvent) => {
        console.log('e', e.currentTarget.id);
        router.push(`${path}/${e.currentTarget.id}`)
    }
    return (
        <Box mt={3}>
            {courses && courses.map(course => (
                <Card variant="clickable" onClick={goToCourseScorecard} mt={2} key={course._id} id={course._id}>{course.name}: {course.city}, {course.state}</Card>
            ))}
        </Box>
    )
}