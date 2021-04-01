import React, { Component } from 'react'


export default class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: this.props.time, question: this.props.question};
    }
    
    componentDidMount() {
        const seconds = this.state.seconds;
        this.myInterval = setInterval(() => {
            if (this.props.question !== this.state.question) {
                this.setState(() => ({
                    seconds: this.props.time,
                    question: this.props.question
                }));
            }

            if (seconds === 0) {
                clearInterval(this.myInterval)
            } else {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 0.01
                }))
            }
        }, 10);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    render() {
        //console.log(this.state.question, this.props.question)
        const seconds = this.state.seconds;

        return (
        <div>
            {seconds <= 0 ? 
                <h1 className='timer-text'>ACABOU</h1> :
                <h1 className='timer-text'>Tempo restante: {Math.ceil(seconds)}</h1>
            }
        </div>
        )
    }
}