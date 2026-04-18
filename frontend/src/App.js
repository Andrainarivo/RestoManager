import './App.css';
import Comps from './Comp';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import Connect from './components/Login/Connect';
import Home from './components/LandingPage/Home';
import Accueil from './components/Dashboard/Tabs/Accueil';
import Commande from './components/Dashboard/Tabs/Commande';
import Prod from './components/Dashboard/Tabs/Production';
import Reservation from './components/Dashboard/Tabs/Reservation';
import Test from './components/Dashboard/Tabs/Test';
import EmpDashboard from './components/EmpDashboard/EmpDashboard';
import Menu from './components/EmpDashboard/EmpTabs/Menu';
import Com from './components/EmpDashboard/EmpTabs/Com';
import Reserve from './components/EmpDashboard/EmpTabs/Reserve';
import Stock from './components/EmpDashboard/EmpTabs/Stock';
  

function App() {
  return (
    <div className="">
            <Routes>
                <Route path='' element={<Home/>} />
                <Route path='home' element={<Home/>} />
                <Route path='login' element={<Login/>} />
                <Route path='signup' element={<Signup/>} />
                <Route path='connect' element={<Connect/>} />

                <Route path='dashboard' element={<Dashboard/>}>
                    <Route index element={<Accueil/>} />
                    <Route path='accueil' element={<Accueil/>} />
                    <Route path='commande' element={<Commande/>} />
                    <Route path='reservation' element={<Reservation/>} />
                    
                </Route>

                <Route path='employe-dashboard' element={<EmpDashboard/>} >
                  <Route index element={<Menu/>} />
                  <Route path='menu' element={<Menu/>} />
                  <Route path='commande' element={<Com/>} />
                  <Route path='reservation' element={<Reserve/>} />
                  <Route path='stock' element={<Stock/>} /> 
                </Route>

                <Route path='*' element={<Comps/>} />
            </Routes>
        
    </div>
  );
}

export default App;
