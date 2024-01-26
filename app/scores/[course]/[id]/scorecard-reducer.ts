import { Course } from "@/types/course";
import { Hole } from "@/types/hole";
import { Scorecard } from "@/types/scorecard";

export enum ActionTypes {
    "UPDATE_STROKES",
    "UPDATE_PLAYER_NAME",
}

interface Action  {
    type: ActionTypes
    payload: any
}

const calculateTotals = (scorecard: Scorecard): {plusMinus: number, total: number} => {
    const scorecardHoles = Object.values(scorecard)
        .filter(item => item instanceof Object && 'par' in item);

    return scorecardHoles.reduce((tuple: {plusMinus: number, total: number}, hole: {par: number, strokes?: number}) => {
        const {par, strokes} = hole;
        if (strokes && strokes > 0) {
            tuple.plusMinus += (strokes - par);
            tuple.total += strokes
        }

        return tuple;
    }, {plusMinus: 0, total: 0})

}

const scorecardReducer = (state: Scorecard, action: Action): Scorecard => {
    const {type, payload} = action;
    switch(type) {
       case ActionTypes.UPDATE_STROKES:
            const newState = {...state}
            
            if(payload.hole && payload.strokes) {
                newState[payload.hole] = {
                    ...state[payload.hole],
                    strokes: payload.strokes
                };
                const newTotals = calculateTotals(newState);
                newState.plusMinus = newTotals.plusMinus;
                newState.score = newTotals.total;
            }
            return newState;
        case ActionTypes.UPDATE_PLAYER_NAME:
            return {...state, playerName: payload};
        default:
            console.warn(`ScorecardReducer() called with unknown action: ${type}`);
            return state;
    }
}

/**
 * Creates a player's scorecard with all of the holes
 */
export const buildDefaultScorecard = (course: Course, playerName?: string): Scorecard => {
    const rv = {
        date: new Date(),
        course: course.name,
        plusMinus: 0,
        score: 0
    } as Scorecard;

    if(playerName?.length) {
        rv.playerName = playerName
    }

    course.scorecard.forEach((x: Hole) => {
        rv[x.Hole] = {
            par: x.Par
        }
    })

    return rv;
}

export default scorecardReducer;