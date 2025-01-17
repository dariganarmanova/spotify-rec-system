import React from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import './main.css'

const MainPage = () => {
    return (
        <div>
            <h1 className="textMain">First, before starting, let's Log In or Sign In!</h1>
            <div className="authContainer">
                <h1 className='textMainLog'>Sign Up here: </h1>
                <SignUp/>
                <h1 className="textMainLog">Or Log In here:</h1>
                <LogIn/>
            </div>
        </div>
    )
}

export default MainPage;