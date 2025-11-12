import React from "react";

function Count({text, count}){
    console.log("rendering <Count /> - ", text);
    return(
        <p>
            {text} : {count}
        </p>
    );
}
export default React.memo(Count);