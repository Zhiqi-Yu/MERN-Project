import React from "react";

export default function SuccessChild({name, address, Story}){
    return (
        <div>
            <p>Name: {name}</p>
            <p>Address: {address}</p>

            {/* render SuccessStory component */}
            <Story />
        </div>
    )
}