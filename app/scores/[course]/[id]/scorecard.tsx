"use client";
import styles from './scorecard.module.scss';
import {useState, useEffect, useReducer} from 'react';
import { Course } from '@/types/course';
import { Hole } from '@/types/hole';
import { Scorecard } from '@/types/scorecard';
import scorecardReducer, {ActionTypes, buildDefaultScorecard} from './scorecard-reducer';

export default function Scorecard({course}: {course: Course}) {
    const { scorecard, name }: { scorecard: Hole[], name: string } = course;
    
    const outNine: Hole[] = scorecard.slice(0, 9);
    const inNine: Hole[] = scorecard.slice(9);
    
    const [selectedNine, setSelectedNine] = useState<Hole[]>(outNine);
    const [displayableTotal, setDisplayableTotal] = useState<string>('');

    const [scorecardState, scorecardDispatch] = useReducer(scorecardReducer, buildDefaultScorecard(course));

    useEffect(() => {
        const {plusMinus} = scorecardState;
        if (plusMinus === undefined) {
            return;
        } else if (plusMinus === 0) {
            setDisplayableTotal('Even');
            return;
        } 
        setDisplayableTotal(plusMinus > 0 ? `+${plusMinus}` : plusMinus.toString())
    }, [scorecardState]);

    const updateScorecard = (e: React.FocusEvent<HTMLInputElement>): void => {
        const holeNumber = parseInt(e.currentTarget.id);
        const strokes = parseInt(e.currentTarget.value);
        if (Number.isNaN(holeNumber) || Number.isNaN(strokes)) {
            return;
        }

        //TODO: figure out how and when to total up the score.

        scorecardDispatch({type: ActionTypes.UPDATE_STROKES, payload: {hole: holeNumber, strokes}});        
    }

    const toggleEditMode = (e: React.MouseEvent<HTMLDivElement>): void => {
        //TODO: implement;
    }
    
    return (
        <div className={styles.main}>
            <div>
                <label htmlFor="nameEntry">Enter your name:</label>
                <input
                    type="text"
                    id="nameEntry"
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => scorecardDispatch({type: ActionTypes.UPDATE_PLAYER_NAME, payload: e.currentTarget.value})}/>
            </div>
            <div className={styles.cardGrid}>
            

                <div className={styles.headerRow}>Hole</div>
                
                {
                    selectedNine && selectedNine
                        .map(({Hole}) => 
                            <div className={styles.headerRow} key={Hole}>{Hole}</div>
                        )
                }
                
                <div className={styles.headerRow}>{JSON.stringify(selectedNine) === JSON.stringify(outNine) ? 'OUT' : 'IN'}</div>

                <div>HCP</div>
                
                {
                    selectedNine && selectedNine
                        .map(({Hole, Handicap}) => 
                            <div key={Hole}>{Handicap}</div>
                        )
                }

                <div></div>

                <div>Par</div>

                {
                    selectedNine && selectedNine
                        .map(({Hole, Par}) => 
                            <div key={Hole}>{Par}</div>
                        )
                }

                <div>{selectedNine.reduce((total, current) => {return total += current.Par}, 0)}</div>
                
                <div>{scorecardState?.playerName ?? 'Score'}</div>

                {
                    selectedNine && selectedNine
                        .map(({Hole}) => 
                            <div key={Hole} onClick={toggleEditMode}>
                                <input
                                    type="text"
                                    // These arent stopping me from entering non positive integers
                                    inputMode="numeric" 
                                    pattern="[0-9]*"
                                    id={Hole.toString()}
                                    className={styles.scoreInput}
                                    onBlur={updateScorecard}/>
                            </div>
                        )
                }

                <div>
                    {displayableTotal}
                </div>
                

            </div>
        </div>
    )
}