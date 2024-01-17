import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <p>Est. 2024</p>
        </div>
        <p>
          The Majestic at Lake Walden. Heartland, Michigan.
        </p>
      </div>

      <div className={styles.center}>
        <h1 className={styles.title}>Liv Defectors</h1>
        
        <p>Fairways and Greens, That&apos;s how we roll.</p>
      </div>

      <div className={styles.grid}>

      </div>
    </main>
  )
}
