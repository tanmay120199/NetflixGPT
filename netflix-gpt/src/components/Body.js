import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
    const dispatch=useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        },
    ]);

    //onAuthStateChanged is an api like an event listener which will be called whenver there is
    //--some change in authentication(means when user sign up, sign in, logout), this will be called
    //we want this to be called only once, hence using in useEffect
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const {uid, email, displayName} = user;
                dispatch(addUser({uid:uid,email:email,displayName:displayName}));

            } else {
                // User is signed out
                dispatch(removeUser());
            }
        });
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}></RouterProvider>
        </div>
    );
};

export default Body;