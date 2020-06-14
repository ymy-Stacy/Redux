import React from 'react'

import { Component } from "react";
import store from "./store";
import {increment, decrement} from './action';

class ReduxCounter extends Component {
    constructor(props){
        super(props);
        this.state  = this.getOwnState();
        this.onChange = this.onChange.bind(this);
        this.onIncrement = this.onIncrement.bind(this);
        this.onDecrement = this.onDecrement.bind(this);

    }
    getOwnState() {
        const state = store.getState();
        // const ownState = this.state;//这两行就可以比较一下，心里有数，知道store.getState()；和this.state的区别
        // console.log('state', state, 'ownState', ownState);
        let sum = 0;
        for(const key in state) {
            if(state.hasOwnProperty(key)){
                sum += state[key];
            }
        }
        return {
            sum,
            value: store.getState()[this.props.caption]
        }
    }
    onChange() {
        this.setState(this.getOwnState());
    }
    componentDidMount() {
        store.subscribe(this.onChange);
    }
    componentWillUnmount(){
        store.unsubscribe(this.onChange);
    }
    onIncrement(){
        store.dispatch(increment(this.props.caption));
    }
    onDecrement(){
        store.dispatch(decrement(this.props.caption));
    }
    render() {
        const {value, sum} = this.state;
        const {caption} = this.props;

        return(
            <div>
                <button onClick={this.onIncrement}> +++++</button>
                <button onClick={this.onDecrement}> -----</button>
                <button>{caption} count: {value} sum:{sum}</button>
            </div>
        )
    }
}

export default ReduxCounter;