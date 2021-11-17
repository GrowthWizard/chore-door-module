import React from 'react';
import './navigation.css';
import Instructions from '../Instructions/instructions';

//import Images for rendering
import logo from './logo.svg';

export default function Navigation() {


    return (
        <div className="navigation">
            <div className="header">
                <img src={logo} />
            </div>
            <Instructions />
        </div>
    );
}

