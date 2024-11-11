import { useState } from 'react'
import HTMLFlipBook from 'react-pageflip';
import styles from './App.module.css'

import cover from './assets/suckers_title.jpg'


function App() {
  const [count, setCount] = useState(0)

  const clickHandler = () => {
    setCount(count+1);
  }

  return (
    // <>Hello world</>
    <HTMLFlipBook width={612} height={792} showCover={true}>
        <div className={styles.page}>
          <img src={cover}/>
        </div>
        <div className={styles.page}>page 1</div>
        <div className={styles.page}>page 2</div>
        <div className={styles.page}>page 3</div>
        <div className={styles.page}>page 4</div>
    </HTMLFlipBook>
  )
}

export default App
