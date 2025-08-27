import React, {Component, PureComponent} from "react";
import NameComponent from "./NameComponent";
// HomeComponent.js 与 ControlledVsUncontrolled.jsx 在同一文件夹 CommonComponents 下
import ControlledVsUncontrolled from "./ControlledVsUncontrolled.jsx"; 
// 如果你本地 webpack 不解析 .jsx，改成：
/* import ControlledVsUncontrolled from "./ControlledVsUncontrolled.jsx"; */



export default class HomeComponent extends React.Component{
    constructor(parameters){
        super(parameters);
        this.state = {
            timer: 0,
            name: "Hello Mr. DJ",
            address : {
                firstLine: "21",
                secondLine: "Main Street",
                city: "New York", 
                state: "NY"
            }
        };
        //this.startTimer();

        //react references - this is used to refer to the current instance of the class
        this.refName = React.createRef(); // Create a ref to access the input element
    }

    startTimer = (incrementer) =>{
        setInterval(()=>{
            this.setState({timer: this.state.timer + incrementer});
        }, 1000)
    }

    onTextChange = (event) => {
        this.setState({name: event.target.value})
    }

    formSubmit = (event) => {
        let name = this.refName.current.value;
        console.log(name);
        this.setState({name:name});
        
        event.preventDefault();
    }

    render(){
        let val1 = 20, val2 = 10;
        
        return (
            <div style={{padding: '5px', border: '1px solid red'}}>
                {/* <div style={{backgroundColor: 'lightblue', padding: '5px', border: '1px solid black'}}>
                    <h1>Hello world!</h1>
                    <h4>Sum : {val1 + val2}</h4>
                    <h4>Multiplication: {val1 * val2}</h4>
                    <h4>Substraction: {val1 - val2}</h4>
                    <h4>Timer: {(this.state.timer)}</h4>
                    <p>This is a simple React Component..</p>
                </div>
                

                <NameComponent name={"Yu"} id={this.state.timer} address={this.state.address} startTimer={this.startTimer}/> */}


                {/* controlled component - where the value of the input field is controlled by the state of the component */}
                <input type="text" placeholder="Enter your name" value={this.state.name} 
                    onChange={this.onTextChange}/>
                    {/* onChange={(e) => {this.setState({name: e.target.value})}}/> */}


                {/* uncontrolled component - where the value of the input field is not controlled by the state of the component */}
                <form action="/user" method="post" style={{backgroundColor: 'lightblue', padding: '5px', border: '1px solid black', margin: "10 px"}}>
                    <input type="text" placeholder="Enter your name - free flow" maxLength={25}
                        ref={this.refName}/> 

                    <input type="submit" value="Submit" onClick={this.formSubmit}/>
                </form>


                <ControlledVsUncontrolled/>
            </div>
        )
    }
}