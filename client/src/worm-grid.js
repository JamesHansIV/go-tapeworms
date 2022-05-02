import React from 'react';
import './App.css';

class WormGrid extends React.Component {
    state = {
        error : null,
        isLoaded : false,
        worms: []
    };

    componentDidMount() {
        fetch('/order-list')
        .then(response=>response.json())
        .then(data=> {
                this.setState({
                    isLoaded : true,
                    worms : data
                });
            }, (error) => {
                console.log("worm loading error: ",error);
                this.setState({
                    isLoaded: true,
                    error
                });
            },
        )
    }

    

    render() {
        return (
            <div className='worm-grid'>
                {
                    this.state.worms.map((worm) => (
                        <div>
                            <p>{"./src/img/" + worm.img_src}</p>
                            <div>
                                {worm.name}<br/>
                                <img url={"./src/img/" + worm.img_src}/>

                            </div>
                            {/*<img src={'/img/'+ worm.img_src}></img> */}
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default WormGrid;