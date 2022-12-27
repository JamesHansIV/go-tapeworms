import React from 'react';

class Worm extends React.Component {
    state = {
        name: '',
        min_length: '',
        max_length: '',
        min_testes: '',
        max_testes: '',
        num_bothria: '',
        num_bothridia: '',
        num_suckers: '',
        parasite_of: '',
        apical_organ_color: ''
    };

    componentDidMount() {
        fetch('/order-list')
        .then(response=>response.json())
        .then(data=> {
                this.setState({
                    name: data[0].name,
                    min_length: data[0].min_length,
                    max_length: data[0].max_length,
                    min_testes: data[0].min_testes,
                    max_testes: data[0].max_testes,
                    num_bothria: data[0].num_bothria,
                    num_bothridia: data[0].num_bothridia,
                    num_suckers: data[0].num_suckers,
                    parasite_of: data[0].parasite_of,
                    apical_organ_color: data[0].apical_organ_color 
                });
            }, (error) => {
                console.log("worm loading error: ",error);
            },
        )
    }

    render() {
        return <h4>Im a worm. My name is {this.state.name}</h4>
    }
}

export default Worm;