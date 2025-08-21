// functional component - a functional component is react is a simple function that returns JSX
import React from "react";

let NameComponent = (props) =>{
    // props is an object that contains the properties passed to the component
    // props.name is the name property passed to component
    return(
        <div>
            <h1>hello, {props.name}!</h1>
            <p>this is a functional component.</p>
        </div>
    );
}
export default NameComponent;