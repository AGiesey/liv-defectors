import {ScorecardTeebox} from './scorecard-teebox';

/**
 * from https://rapidapi.com/foshesco-65zCww9c1y0/api/golf-course-api/
 * Course.scorecard is an array of holes
 */
export interface Hole {
    Handicap: number,
    Hole: number,
    Par: number,
    tees: {[teeBox: string]: ScorecardTeebox}
}