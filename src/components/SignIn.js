import React, { useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SignIn({ email, password }) {
    const auth = getAuth();
    useEffect(() => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }, [email,password]);


    return (
        <div></div>
    )
}

export default SignIn