import { useState } from "react";
import './LoginForm.css'

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    function hidePassword() {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <p>Hello, welcome to my website</p>
            <div>
                <input 
                    className='login-input'
                    placeholder='Email'
                />    
            </div>
            <div>
                <input 
                    className='login-input'
                    placeholder='Password'
                    type={ showPassword ? 'text' : 'password' }
                />
                <button
                    onClick={hidePassword}
                >Show
                </button>
            </div>
            <button className='action-button'>Login</button>
            <button className='action-button'>Sign up</button>
        </>
    )
}

export default LoginForm;