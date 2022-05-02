import React from 'react';

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
            <div>
                {
                    this.state.worms.map((worm) => (
                        <li key={worm.id}>
                            <div>
                                <p>{worm.name}</p>
                               {/*<img src={'/img/'+ worm.img_src}></img> */}
                            </div>
                        </li>
                    ))
                }
            </div>
        );
    }
}

export default WormGrid;