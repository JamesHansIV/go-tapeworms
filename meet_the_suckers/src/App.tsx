import { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page.tsx';
import { FlipUpData } from './FlipUp.tsx';

import styles from './App.module.css';

import cover from './assets/suckers_title.jpg';
import page_1 from './assets/suckers_1.jpg';
import page_2 from './assets/suckers_2.jpg';
import page_3 from './assets/suckers_3.jpg';
import page_4 from './assets/suckers_4.jpg';
import page_5 from './assets/suckers_5.jpg';
import page_6 from './assets/suckers_6.jpg';
import page_7 from './assets/suckers_7.jpg';
import page_8 from './assets/suckers_8.jpg';

// con
const WIDTH = 612;

function App() {
  const [currentPageNum, setCurrentPageNum] = useState<number>(0);
  const [, setPageCount] = useState<number>(0);
  const [pageArray, setPageArray] = useState<number[]>([]);
  const book = useRef<any>();
  
  const init = useCallback(() => {
    if (book && book.current) {
      const count = book.current.pageFlip().getPageCount()
      setPageCount(count);
      setPageArray([...Array(count).keys()]);
      // console.log(count, [...Array(count).keys()]);
      // console.log(pageArray);
    }
  },[]);

  const pageTurn = (e: any) => {
    console.log("e type", typeof(e))
    setCurrentPageNum(e.data);
  }

  const handleStateChange = (e: Event) => {
    console.log(e);
  }

  const turnPage = (increment: number) => {
    if (book && book.current) {
      if (increment > 0) {
        book.current.pageFlip().flipNext();
      } else {
        book.current.pageFlip().flipPrev();
      }
    }
  }

  const turnToPage = (pageNumber: number) => {
    if (book && book.current) {
      book.current.pageFlip().flip(pageNumber);
    }
  }

  // divs should be their own components
  return (
    // <>Hello world</>
    <div style={{ width: `${2 * WIDTH}px`, height: '100vh', marginTop: '3em' }}>
      <div className={styles.bookContainer}>
        <HTMLFlipBook
          width={WIDTH} height={792}
          showCover={true}
          onChangeState={e => handleStateChange(e)}
          disableFlipByClick={true}
          // children={undefined} 
          className={''}
          style={{}}
          startPage={0}
          size={'fixed'}
          minWidth={0}
          maxWidth={700}
          minHeight={0}
          maxHeight={1000}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={1}
          mobileScrollSupport={false}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          ref={book}
          onInit={init}
          onFlip={pageTurn}
        >
          {/* cover */}
          <Page imgSrc={cover} />


          {/* background 2 page spread */}
          <Page imgSrc={page_1} />
          <Page imgSrc={page_2} />

          {/* authors and title page */}
          <Page imgSrc={page_3} />
          <Page imgSrc={page_4} />

          {/* content pages  */}
          <Page imgSrc={page_5} />
          <Page imgSrc={page_6} />
          <Page
            imgSrc={page_7}
            flipUps={FlipUpData.slice(0, 2)}
          />
          <Page imgSrc={page_8} />

        </HTMLFlipBook>
      </div>
      <div className={styles.controlContainer} style={{color:"white"}}>
        <button className={styles.button} onClick={()=>turnPage(-1)}>Prev</button>
        <ul>
          {
            pageArray.map((i) => { 
              return (
                <li 
                  style={{fontSize: (currentPageNum === i) ? '18px' : '16px',
                          textDecoration: (currentPageNum === i) ? 'underline' : ''}}
                  onClick={()=>turnToPage(i)}
                  >
                    {(i === 0) ? `${i}` : (i%2 === 0) ? '' : `${i} - ${i+1}`}
                </li>
                )
            })
          }
        </ul>
        <button className={styles.button} onClick={()=>turnPage(1)}>Next</button>
        {/* {pageCount} | {currentPageNum} */}
      </div>
      {/* <h5 style={{color:"white"}}>User State: </h5> */}
    </div>
  )
}

export default App
