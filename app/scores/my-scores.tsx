'use client';
import { useContext } from 'react';
import { RoundsContext } from '@/app/rounds-context';
import styles from '@/app/page.module.scss';
import { Card } from 'theme-ui';

export default function MyScores() {
    const {rounds} = useContext(RoundsContext);
    /**
     * TODO:
     *  Make these linkable to the scoecard interface for "edit"
     *  Add accordion that shows a scorecard when an entry is clicked
     */
    return (
        <div>
            <h2 className={styles.sectionTitle}>My Scores</h2>
            {
                Object.entries(rounds).map(([key, value]) => {
                    //This only works because there's only 1 golfer right now
                    const {strokes, plusMinus} = Object.values(value.golfers)[0]
                    return (
                        <Card key={key} sx={{display: 'flex', gap: '1em'}}>
                            <div>
                                {value.date.toDateString()}
                            </div>
                            <div>
                                {value.courseName}
                            </div>
                            <div>
                                {strokes} ({plusMinus > 0 ? `+${plusMinus}` : plusMinus})
                            </div>
                        </Card>
                    )
                })
            }
        </div>
    )
}