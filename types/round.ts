export interface Round {
    courseName: string;
    courseId: string;
    date: Date;
    [golferName: string]: {}
}