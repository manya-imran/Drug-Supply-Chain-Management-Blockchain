import React from 'react';
import './App.css';
import DrugTrace from './pagess/drug-trace';
import Manufacturer from './pagess/manufacturer';
import Wholesaler from './pagess/wholesaler'
import Pharmacist from './pagess/pharmacist'
import Patient from './pagess/patient'

import {Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<DrugTrace />} />
        <Route path="/drugtrace" element={<DrugTrace />} />
        <Route path="/manufacturer" element={<Manufacturer/>}/>
        <Route path="/wholesaler" element={<Wholesaler/>}/>
        <Route path="/pharmacist" element={<Pharmacist/>}/>
        <Route path="/patient" element={<Patient/>}/>
      </Routes>
    </div>
  );
}

export default App;

/*
import logo from './logo.svg';
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
