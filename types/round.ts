import { Scorecard } from "./scorecard";

export interface Round {
    courseName: string;
    courseId: string;
    date: Date;
    golfers: {[golferName: string]: Scorecard};
}