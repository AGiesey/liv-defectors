"use client";
import styles from './scorecard.module.scss';
import { useState, useEffect, useReducer, useContext } from 'react';
import { Course } from '@/types/course';
import { Hole } from '@/types/hole';
import { useRouter } from 'next/navigation';
import { Scorecard } from '@/types/scorecard';
import scorecardReducer, { ActionTypes, buildDefaultScorecard } from './scorecard-reducer';
import { Field, Box, Label, Radio, Button, Select } from 'theme-ui'
import { RoundsContext } from '@/app/rounds-context';
import { Round } from '@/types/round';

export default function Scorecard({course}: {course: Course}) {
    const router = useRouter();
    const { scorecard, name }: { scorecard: Hole[], name: string } = course;
    
    const outNine: Hole[] = scorecard.slice(0, 9);
    const inNine: Hole[] = scorecard.slice(9);
    
    const [ selectedNine, setSelectedNine ] = useState<Hole[]>(outNine);
    const [ displayableTotal, setDisplayableTotal ] = useState<string>('');

    const [scorecardState, scorecardDispatch] = useReducer(scorecardReducer, buildDefaultScorecard(course));
    
    //TODO: it might be worth creating a reducer for this too.
    const { rounds, setRounds } = useContext(RoundsContext);

    useEffect(() => {
        scorecardDispatch({type: ActionTypes.UPDATE_TEE, payload: course.teeBoxes[0].tee})
    }, [])

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

        scorecardDispatch({type: ActionTypes.UPDATE_STROKES, payload: {hole: holeNumber, strokes}});        
    }

    const saveRound = () => {
        const {course, date, playerName} = scorecardState;
        const round = {
            courseName: course,
            date,
        } as Round

        console.log("SCORECARD", scorecardState);

        if(typeof playerName === 'string') {
            round.golfers = {[playerName]: {...scorecardState}}
        }
        setRounds({...rounds, [`${Math.floor(date.getTime() / 1000)}`]: round});
        router.push('/scores');
    }
    
    return (
        <div className={styles.main}>
            <Box as="form" my={'1em'} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.controls}>
                    <div>
                        <Label htmlFor="nameEntry">Enter your name:</Label>
                        <Field
                            sx={{
                                width: '15em',
                                mt: '.5em',
                                mb: '1em'
                            }}
                            type="text"
                            id="nameEntry"
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => scorecardDispatch({type: ActionTypes.UPDATE_PLAYER_NAME, payload: e.currentTarget.value})}
                        />
                    </div>
                    <div>
                        <Label htmlFor="teeSelect">Select Tee:</Label>
                        <Select
                            value={scorecardState.tee}
                            onChange={(e) => scorecardDispatch({type: ActionTypes.UPDATE_TEE, payload: e.currentTarget.value})}
                            sx={{
                                width: '15em',
                                mt: '.5em',
                                mb: '1em'
                            }}
                        >
                            {
                                course.teeBoxes.map(teebox => <option key={teebox.tee} value={teebox.tee}>{teebox.tee}</option>)
                            }
                        </Select>
                    </div>
                    <div>
                        <Label sx={{mb: '.5em'}} htmlFor="selectedNine">Pick your side:</Label>
                        <Label >
                            <Radio name="selectedNine"
                                defaultChecked={true}
                                onChange={() => setSelectedNine(outNine)}
                            />
                            Front Nine
                        </Label>
                        <Label>
                            <Radio name="selectedNine"
                                onChange={() => setSelectedNine(inNine)}
                            />
                            Back Nine
                        </Label>
                    </div>
                </div>
            </Box>
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
                            <Box as="form" key={Hole}>
                                <Field
                                    // These arent stopping me from entering non positive integers
                                    inputMode="numeric" 
                                    pattern="[0-9]*"
                                    id={Hole.toString()}
                                    className={styles.scoreInput}
                                    onBlur={updateScorecard} />
                            </Box>
                        )
                }

                <div>
                    {displayableTotal}
                </div>
            </div>
            <Button mt={3} onClick={saveRound}>Complete Round</Button>
        </div>
    )
}