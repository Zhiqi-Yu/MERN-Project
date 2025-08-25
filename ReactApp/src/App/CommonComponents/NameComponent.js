// functional component - a functional component is react is a simple function that returns JSX
import React from "react";

let NameComponent = (props) =>{
    // props is an object that contains the properties passed to the component
    // props.name is the name property passed to component
    return(
        <>
            <div style={{backgroundColor: 'lightGreen', padding: '5px', border: '1px solid black'}}>
                <h1>hello, {props.name}!</h1>
                <p>this is a functional component.</p>
                <p>Component ID: {props.id}</p>
            </div>

            <div style={{backgroundColor: 'lightYellow', padding: '5px', border: '1px solid black'}}>
                
                <p>this is a functional component.</p>
                <p>Component ID: {props.id + 1}</p>
            </div>
        </>
        

        
    );
}
export default NameComponent;