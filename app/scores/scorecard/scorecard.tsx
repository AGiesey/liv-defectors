import styles from './scorecard.module.scss';

export default function Scorecard() {
    const holeNumbers: Array<number> = [1,2,3,4,5,6,7,8,9];

    return (
        <div className={styles.main}>
            <h3>The Links at Hunter's Ridge</h3>

            <div className={styles.cardGrid}>
            

                <div className={styles.headerRow}>Hole</div>
                
                {
                    holeNumbers && holeNumbers
                        .map(hole => 
                            <div className={styles.headerRow} key={hole}>{hole}</div>
                        )
                }
                
                <div className={styles.headerRow}>out</div>

                <div>HCP</div>
                
                {
                    holeNumbers && holeNumbers
                        .map(hole => 
                            <div key={hole}></div>
                        )
                }

                <div></div>

                <div>Par</div>

                {
                    holeNumbers && holeNumbers
                        .map(hole => 
                            <div key={hole}></div>
                        )
                }

                <div></div>
                
                <div>Score</div>

                {
                    holeNumbers && holeNumbers
                        .map(hole => 
                            <div key={hole}></div>
                        )
                }

                <div></div>
                

            </div>
        </div>
    )
}