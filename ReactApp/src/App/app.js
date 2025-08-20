import React from "react";

export default class Application extends React.Component{
    constructor(parameters){
        super(parameters);
    }

    render(){
        return (
            <div>
                <h1>Hello world!</h1>
                <p>This is a simple React Component..</p>
            </div>
        )
    }
}