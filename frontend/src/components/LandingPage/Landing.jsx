import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser, faEnvelope} from '@fortawesome/free-solid-svg-icons';



const Landing = () => {



    return(
        <div className="fond w-full h-[700px] brightness-75 flex flex-col items-center justify-center">
            <div className="">
                <p className=' text-white backdrop-blur-md shadow-black shadow-2xl px-10   text-5xl text-center'>Une gestion de restaurant plus<br/> facile commence ici.</p>
            </div>
            <Link to="/dashboard">
                <Button>Dashboard</Button>
            </Link>
            <Link to='/employe-dashboard'>
                <Button>Employe-dashboard</Button>
            </Link>
            <Link to='/connect'>
                <Button>Employer</Button>
            </Link>
            
        </div>
    )
}


export default Landing;