import React from "react";

function Button({handleClick, children}){
    console.log("rendering <Button /> - ", children);
    return(
        <button onClick={handleClick} style={{marginRight: "8px"}}>
            {children}
        </button>
    );
}
export default React.memo(Button);