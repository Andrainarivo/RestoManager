import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/logo.png";
import { Label } from "../ui/label";
import { Input } from '../ui/input';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/clients/login", { email, password }    
            );
            console.log(response.data.token)
            if (response.data.token) {
                // Stocker le token dans le localStorage ou context API
                // document.cookie.setItem('token', response.data.token);
                sessionStorage.setItem('token', response.data.token)
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            setError('Identifiants incorrects');
        }
    };

    return (
        <div className='login'>
            <form className="my-form" onSubmit={handleSubmit}>
                <div className="login-welcome-row flex">
                    <a href="#" title="Logo">
                        <img src={logo} alt="logo" className=" w-12" />
                    </a>
                    <div>
                        <p>Restaurant Fianara</p>
                    </div>
                </div>
                <div>
                    <p className=' text-neutral-600 text-xl font-semibold'>S'identifier</p>
                </div>
                <div className="input__wrapper">
                    <div className={`grid w-full max-w-sm items-center gap-1.5 ${error ? 'text-red-500' : ''}`}>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                            type="email" 
                            id="email" 
                            value={email}
                            placeholder="....@gmail.com" 
                            onChange={(e) => setEmail(e.target.value)} 
                            className={`${error ? 'border-red-500' : ''}`} 
                        />
                    </div>
                </div>
                <div className="input__wrapper">
                    <div className={`grid w-full max-w-sm items-center gap-1.5 ${error ? 'text-red-500' : ''}`}>
                        <Label htmlFor="password">Password</Label> 
                        <Input 
                            type="password" 
                            id="password" 
                            placeholder="********" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            className={`${error ? 'border-red-500' : ''}`} 
                        />
                    </div>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="my-form__button">
                    Se connecter
                </button>
                <div className="my-form__actions">
                    <div className="my-form__row">
                        <span>Pas de compte?</span> 
                        <Link to='/signup' title="Create Account">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
