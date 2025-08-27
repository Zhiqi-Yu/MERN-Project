import React, {Component, PureComponent, Suspense} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './app.css'
import HeaderComponent from './CommonComponents/HeaderComponent';
import HomeComponent from './CommonComponents/HomeComponent';
import FooterComponent from './CommonComponents/FooterComponent';
import About from './CommonComponents/AboutComponent.jsx'; // complete path with .jsx extention
import NotFoundComponent from './CommonComponents/NotFoundComponent.js';


export default class Application extends React.Component{
    constructor(parameters){
        super(parameters);
        this.state = {timer: 0};
        // this.startTimer();
    }



    render(){
        
        
        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <HeaderComponent />
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<HomeComponent />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/about/:id/:name" element={<About />} /> 
                            <Route path="*" element={<NotFoundComponent />} />
                            {/* <HomeComponent />  
                            <About /> */}
                        </Routes>              
                    <FooterComponent />
                </Suspense>
            </Router>
        )
    }
}