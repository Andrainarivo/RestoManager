import React, { useState } from 'react';
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { Label } from "../ui/label";
import { Input } from '../ui/input';
import axios from 'axios';


const Signup = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://192.168.0.13:8080/clients/register",
                { nom, prenom, email, password }
            );

            navigate('/login');
            
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
        }
    }

  return (
    <div className='login'>
        <form class="my-form"    >
        <div class="login-welcome-row flex">
            <a href="#" title="Logo">
                {/* <img src="assets/storeify.png" alt="Logo" class="logo"> */}
            </a>
            <img src={logo} alt="logo" className=" w-12" />
            <div>
                <p>Restaurant Fianara</p>
            </div>
            
        </div>
        <div>
            <p className=' text-neutral-600 text-md font-semibold'>Créer un compte pour votre restaurant</p>
        </div>
        <div class="input__wrapper">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="nom">Nom</Label> 
                <Input type="text" onChange={ (e) => setNom(e.target.value) } />
            </div>
        </div>
        <div class="input__wrapper">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="prenom">Prenom</Label> 
                <Input type="text" onChange={ (e) => setPrenom(e.target.value) }  />
            </div>
        </div>
        <div class="input__wrapper">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label> 
                <Input type="email" placeholder="....@gmail.com" onChange={ (e) => setEmail(e.target.value) } />
            </div>
        </div>
        <div class="input__wrapper">
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="pass">Password</Label> 
                <Input type="password" id="pass" placeholder="********" onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>

            <button type="submit" class="my-form__button" onClick={handleSignUp}>
                Créer
            </button>

   
        <div class="my-form__actions">
            <div class="my-form__row">
                <span>J'ai déjà un compte?</span>
                <Link to='/login' title="Create Account">
                    Sign in
                </Link>
            </div>
        </div>
        
        </form>
    </div>
  )
}

export default Signup
