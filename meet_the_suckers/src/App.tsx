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
import page_9 from './assets/suckers_9.jpg';
import page_10 from './assets/suckers_10.jpg';
import page_11 from './assets/suckers_11.jpg';
import page_12 from './assets/suckers_12.jpg';
import page_13 from './assets/suckers_13.jpg';
import page_14 from './assets/suckers_14.jpg';
import page_15 from './assets/suckers_15.jpg';
import page_16 from './assets/suckers_16.jpg';
import page_17 from './assets/suckers_17.jpg';
import page_18 from './assets/suckers_18.jpg';
import page_19 from './assets/suckers_19.jpg';
import page_20 from './assets/suckers_20.jpg';
import page_21 from './assets/suckers_21.jpg';
import page_22 from './assets/suckers_22.jpg';
import page_23 from './assets/suckers_23.jpg';
import page_24 from './assets/suckers_24.jpg';



// constants
const WIDTH = 612; // TODO: dynamic sizing
const HEIGHT = 798;

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
    <div style={{ width: `${2 * WIDTH}px`, height: '100vh', marginTop: '3em' }}>
      <div 
        // style={{boxShadow: `${currentPageNum === 0 ? `${WIDTH}px 0 5px 2px rgba(0, 0, 0, 0.4)` : '0 0 20px 0 rgba(0, 0, 0, 0.5)'}`}}
        >
        <HTMLFlipBook
          width={WIDTH} height={HEIGHT}
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
          <Page imgSrc={cover} pageNum={0}/>


          {/* background 2 page spread */}
          <Page imgSrc={page_1} pageNum={1}/>
          <Page imgSrc={page_2} pageNum={2}/>

          {/* authors and title page */}
          <Page imgSrc={page_3} pageNum={3}/>
          <Page imgSrc={page_4} pageNum={4}/>

          {/* content pages  */}
          <Page imgSrc={page_5} pageNum={5}/>
          <Page imgSrc={page_6} pageNum={6}/>
          <Page
            imgSrc={page_7}
            flipUps={FlipUpData.slice(0, 2)}
            pageNum={7}
          />
          <Page 
            imgSrc={page_8} 
            flipUps={FlipUpData.slice(2, 4)}
            pageNum={8}
          />
          <Page 
            imgSrc={page_9} 
            flipUps={FlipUpData.slice(4, 6)}
            pageNum={9}
          />
          <Page 
            imgSrc={page_10} 
            flipUps={FlipUpData.slice(6, 9)}
            pageNum={10}
          />
          <Page 
            imgSrc={page_11} 
            flipUps={FlipUpData.slice(9, 11)}
            pageNum={11}
          />
          <Page 
            imgSrc={page_12} 
            flipUps={FlipUpData.slice(11, 13)}
            pageNum={12}
          />
          <Page 
            imgSrc={page_13} 
            flipUps={FlipUpData.slice(13, 16)}
            pageNum={13}
          />
          <Page 
            imgSrc={page_14} 
            flipUps={FlipUpData.slice(16, 18)}
            pageNum={14}
          />
          <Page imgSrc={page_15} pageNum={15}/>
          <Page imgSrc={page_16} pageNum={16}/>
          <Page imgSrc={page_17} pageNum={17}/>
          <Page imgSrc={page_18} pageNum={18}/>
          <Page imgSrc={page_19} pageNum={19}/>
          <Page imgSrc={page_20} pageNum={20}/>
          <Page imgSrc={page_21} pageNum={21}/>
          <Page imgSrc={page_22} pageNum={22}/>
          <Page imgSrc={page_23} pageNum={23}/>
          <Page imgSrc={page_24} pageNum={24}/>

        </HTMLFlipBook>
      </div>
      <div className={styles.controlContainer} style={{color:"white"}}>
        <button className={styles.button} onClick={()=>turnPage(-1)}>
          <span className={styles.buttonText}>Prev</span>
        </button>
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
        <button className={styles.button} onClick={()=>turnPage(1)}>
          <span className={styles.buttonText}>Next</span>
        </button>
      </div>
    </div>
  )
}

export default App
