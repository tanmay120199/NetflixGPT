import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate=useNavigate();

    //useRef is used to reference to email and password inputs to get its value
    const fullName = useRef("");
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidData(fullName.current.value, email.current.value, password.current.value);
        setErrorMessage(message);

        if (!message) {
            if (!isSignInForm) {
                //Sign Up
                createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        console.log('signedup user', user);
                        //redirect user to '/browse' route
                        navigate("/browse");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage(errorCode + "-" + errorMessage);
                    });
            } else {
                //Sign In
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        console.log('signed in user',user);
                        //redirect user to '/browse' route
                        navigate("/browse");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrorMessage("The user doesn't exist. Please sign up!");
                    });
            }
        }
    };
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg 2000w, https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_medium.jpg 1279w, https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_small.jpg 959w" alt="background img" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="absolute w-3/12 p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-70">
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (<input type="text" ref={fullName} placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700" />)}
                <input type="text" ref={email} placeholder="Email address" className="p-4 my-4 w-full bg-gray-700" />
                <input type="text" ref={password} placeholder="Password" className="p-4 my-4 w-full bg-gray-700" />
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now." : "Already registered? Sign In!"}</p>
            </form>
        </div>
    );
};

export default Login;