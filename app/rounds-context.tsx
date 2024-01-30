import { Dispatch, SetStateAction, createContext, useState } from 'react';
import { Round } from '@/types/round';

export interface Rounds {
    [roundId: string]: Round;
}

interface RoundsContext {
    rounds: Rounds,
    setRounds: Dispatch<SetStateAction<{}>>
}

export const RoundsContext = createContext<RoundsContext>({} as RoundsContext);

export default function RoundsContextProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [rounds, setRounds] = useState<Rounds>({});
    return (
        <RoundsContext.Provider value={{rounds, setRounds}}>
            {children}
        </RoundsContext.Provider>
    )
}

export const buildDefaultRound = (): Round => {
    return {
        courseName: '',
        courseId: '',
        date: new Date(),
    }
}

