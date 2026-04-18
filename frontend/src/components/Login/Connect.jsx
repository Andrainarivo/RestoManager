import React, { useState } from 'react';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { Label } from "../ui/label";
import { Input } from '../ui/input';
import axios from 'axios';


const Connect = () => {

    const [email, setEmail] = useState();
    const [personnel_key, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://192.168.0.13:8080/employes/login`, { email, personnel_key })
            console.log(response.data.token);
            if(response.data.token){
                localStorage.setItem('token', response.data.token);
                navigate("/employe-dashboard");
            }
        } catch (error) {
            setError("Identifiants incorrects")
        }
    }

  return (
    <div className='login'>
        <form class="my-form" onSubmit={handleSubmit} >
        <div class="login-welcome-row flex">
            <a href="#" title="Logo">
            </a>
            <img src={logo} alt="logo" className=" w-12" />
            <div>
                <p>Restaurant Fianara</p>
            </div>
            
        </div>
        <div>
            <p className=' text-neutral-600 text-md font-semibold'>Se connecter</p>
        </div>
        <div class="input__wrapper">
            <div className={`grid w-full max-w-sm items-center gap-1.5 ${error ? 'text-red-500' : ''} `}>
                <Label htmlFor="email">Email</Label> 
                <Input className={`${error ? 'border-red-500' : ''}`} type="email" id="email" placeholder="....@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className={`grid w-full mt-4 max-w-sm items-center gap-1.5 ${error ? 'text-red-500' : ''} `}>
                <Label htmlFor="email">Password</Label> 
                <Input className={`${error ? 'border-red-500' : ''}`} type="password" id="" placeholder="****"  value={personnel_key} onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
        {error && <p className='text-red-500' >{error}</p>}
        <button type="submit" class="my-form__button">
            Se connecter    
        </button>
   
        
        </form>
    </div>
  )
}

export default Connect
