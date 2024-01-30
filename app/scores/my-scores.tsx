'use client';
import { useContext } from 'react';
import { RoundsContext } from '@/app/rounds-context';

export default function MyScores() {
    const {rounds} = useContext(RoundsContext);
    return (
        <div>
            <h3>My Scores</h3>
            {
                Object.entries(rounds).map(([key, value]) => {
                    return (
                        <li key={key}>{value.courseName}</li>
                    )
                })
            }
        </div>
    )
}