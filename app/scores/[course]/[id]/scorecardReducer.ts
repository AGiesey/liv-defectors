import { Course } from "@/types/course";
import { Hole } from "@/types/hole";
import { Scorecard } from "@/types/scorecard";

export enum ActionTypes {
    "UPDATE_STROKES",
    "UPDATE_PLAYER_NAME",
    "UPDATE_PLUS_MINUS"
}

interface Action  {
    type: ActionTypes
    payload: any
}

const scorecardReducer = (state: any, action: Action): Scorecard => {
    const {type, payload} = action;
    switch(type) {
       case ActionTypes.UPDATE_STROKES:
            return {
                ...state,
                [payload.hole]: {
                    ...state[payload.hole],
                    strokes: payload.strokes
                }
            }
        case ActionTypes.UPDATE_PLAYER_NAME:
            return {...state, playerName: payload};
        case ActionTypes.UPDATE_PLUS_MINUS:
            return {...state, plusMinus: payload};
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