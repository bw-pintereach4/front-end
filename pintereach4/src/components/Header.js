import React from "react";
import {NavLink} from "react-router-dom";


export default function Header(){
    return (
        <header className="header">
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/log-in">Log In</NavLink>
            <NavLink to="/sign-up">Sign Up</NavLink>
        </header>
    )
}