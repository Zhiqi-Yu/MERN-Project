import React, {Suspense, lazy, useState, useCallback } from "react";
import Title from "./Title";
import Count from "./Count";
import Button from "./Button";

// const Title = lazy(() => import("./Title"));
// const Button = lazy(() => import("./Button"));
// const Count = lazy(() => import("./Count"));

function Hooks(){
    const [age, setAge] = React.useState(25);
    const [salary, setSalary] = React.useState(3000);

    // const incrementAge = () => {
    //     setAge(age + 1);
    // };
    // const incrementSalary = () => {
    //     setSalary(salary + 100);
    // };

    const incrementAge = React.useCallback(() => {
        setAge((prev) => prev + 1);
    }, []);
    const incrementSalary = React.useCallback(() => {
        setSalary((prev) => prev + 100);
    }, []);

    return (
        <div style={{padding: 16}}>
            <Title />

            <Button handleClick={incrementAge}>Increment Age !!!</Button>
            <Count text="Age" count={age} />

            <hr />

            <Button handleClick={incrementSalary}>Increment Salary !!!!!</Button>
            <Count text="Salary" count={salary} />

        </div>
        // <Suspense fallback={<div>Loading components…</div>}>
        //     <Title />

        //     <Button handleClick={incrementAge}>Increment Age</Button>
        //     <Count text="Age" count={age} />

        //     <hr />

        //     <Button handleClick={incrementSalary}>Increment Salary</Button>
        //     <Count text="Salary" count={salary} />
        // </Suspense>
    );
}
export default Hooks;