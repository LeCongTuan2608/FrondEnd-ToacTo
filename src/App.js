import './App.css';
import MainLayout from 'layout';
import { useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from 'pages/Login';
import Signup from 'pages/Signup';

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<MainLayout />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<Signup />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
