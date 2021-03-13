import SignInForm from "./SignInForm"
import React from "react";

const SignIn = () => {
    return ( 
        <React.Fragment>
            <h1 style={{marginTop: "5%"}}>Welcome</h1> 
            <SignInForm/>
        </React.Fragment>
    );
}


export default SignIn;