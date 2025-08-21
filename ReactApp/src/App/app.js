import React, {Component, PureComponent} from "react";
import NameComponent from "./CommonComponents/NameComponent";

export default class Application extends React.Component{
    constructor(parameters){
        super(parameters);
        this.state = {timer: 0};
        this.startTimer();
    }

    startTimer = () =>{
        setInterval(()=>{
            this.setState({timer: this.state.timer + 1});
        }, 1000)
    }

    render(){
        let val1 = 20, val2 = 10;
        console.log("weiweiwei");
        return (
            <div>
                <h1>Hello world!</h1>
                <h4>Sum : {val1 + val2}</h4>
                <h4>Multiplication: {val1 * val2}</h4>
                <h4>Substraction: {val1 - val2}</h4>
                <h4>Timer: {(this.state.timer)}</h4>
                <p>This is a simple React Component..</p>
                

                <NameComponent name={"Yu"} />
            </div>
        )
    }
}