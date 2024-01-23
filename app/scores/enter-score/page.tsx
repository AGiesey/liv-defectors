import styles from '../../page.module.scss';
import Scorecard from './scorecard';

export default function EnterScore() {
    return (
        <main className={styles.main}>
            <h1>Enter New Score</h1>

            <Scorecard />
        </main>
    )
}