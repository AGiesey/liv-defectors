"use client";
import styles from './scorecard.module.scss';
import {useState} from 'react';
import { Course } from '@/types/course';
import { Hole } from '@/types/hole';


export default function Scorecard({course}: {course: Course}) {
    const { scorecard }: { scorecard: Hole[] } = course;
    
    const outNine: Hole[] = scorecard.slice(0, 9);
    const inNine: Hole[] = scorecard.slice(9, 17);
    
    const [selectedNine, setSelectedNine] = useState<Hole[]>(outNine);

    return (
        <div className={styles.main}>
            <div className={styles.cardGrid}>
            

                <div className={styles.headerRow}>Hole</div>
                
                {
                    selectedNine && selectedNine
                        .map(({Hole}) => 
                            <div className={styles.headerRow} key={Hole}>{Hole}</div>
                        )
                }
                
                <div className={styles.headerRow}>out</div>

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
                
                <div>Score</div>

                {
                    selectedNine && selectedNine
                        .map(({Hole}) => 
                            <div key={Hole}></div>
                        )
                }

                <div></div>
                

            </div>
        </div>
    )
}