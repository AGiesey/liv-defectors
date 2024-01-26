export interface Scorecard {
    date: Date;
    course: string;
    playerName?: string,
    tee?: string,
    plusMinus: number,
    score: number,
    strokes?:number,
    [holeNumber: number]: {
        par: number,
        strokes?: number,
        //todo: it would be fun to add metrics such as putts, gir, fairway, etc...
    };
}