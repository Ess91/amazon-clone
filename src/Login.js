import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [ password, setPassword] = useState('');

    const signIn = e => {
        // Prevent page refreshing
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                // Successfully signed in, print auth object to the console
                history.push('/')
                // Redirect the user to the / page
        })
        .catch(error => alert(error.message))
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            //Successfully created new user with email and password
            console.log(auth);
             // If the auth object comes back as non-empty, 
             //user was successfully created; and we can redirect the user to /
            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))

    }

  return (
    <div className="login">
        <Link to='/'>
      <img className="login__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG24.png" />
      </Link>

      <div className="login__container">
          <h1>Sign In</h1>

          <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__registerButton'>Create Amazon Account</button>
      </div>
    </div>
  );
}

export default Login;
