import React from "react";

function Title(){
    console.log("rendering <Title/>");
    return <h2>Demo: Performance Hooks</h2>;
}
export default React.memo(Title);