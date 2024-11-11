import { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from './App.module.css';
import Page from './Page.tsx';

import { FlipUpData } from './FlipUp.tsx';

import cover from './assets/suckers_title.jpg';
import page_1 from './assets/suckers_1.jpg';
import page_2 from './assets/suckers_2.jpg';
import page_3 from './assets/suckers_3.jpg';
import page_4 from './assets/suckers_4.jpg';
import page_5 from './assets/suckers_5.jpg';
import page_6 from './assets/suckers_6.jpg';
import page_7 from './assets/suckers_7.jpg';
import page_8 from './assets/suckers_8.jpg';


function App() {
  const [count, setCount] = useState(0)

  const clickHandler = () => {
    setCount(count+1);
  }

  const handleStateChange = (e: Event) => {
    console.log(e);
  }

  // divs should be their own components
  return (
    // <>Hello world</>
    <>
    <HTMLFlipBook 
        width={612} height={792}
        showCover={true}
        onChangeState={e => handleStateChange(e)}
        disableFlipByClick={true} 
        // children={undefined} 
        // className={''} 
        // style={undefined} 
        // startPage={0} 
        // size={'fixed'} 
        // minWidth={0} 
        // maxWidth={0} 
        // minHeight={0} 
        // maxHeight={0} 
        // drawShadow={false} 
        // flippingTime={0} 
        // usePortrait={false} 
        // startZIndex={0} 
        // utoSize={false} 
        // maxShadowOpacity={0} 
        // mobileScrollSupport={false} 
        // clickEventForward={false} 
        // useMouseEvents={false} 
        // swipeDistance={0} 
        // showPageCorners={false}      
        >
        {/* cover */}
        <Page imgSrc={cover}/>


        {/* background 2 page spread */}
        <Page imgSrc={page_1}/>
        <Page imgSrc={page_2}/>

        {/* authors and title page */}
        <Page imgSrc={page_3}/>
        <Page imgSrc={page_4}/>

        {/* content pages  */}
        <Page imgSrc={page_5}/>
        <Page imgSrc={page_6}/>
        <Page 
          imgSrc={page_7}
          flipUps={FlipUpData.slice(0,2)}
          />
        <Page imgSrc={page_8}/>

    </HTMLFlipBook>
    <h5 style={{color:"white"}}>User State: </h5>
    </>
  )
}

export default App
