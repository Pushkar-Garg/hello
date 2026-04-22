import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Crud from './components/Crud';
import Login from './components/Login';
import Register from './components/Register';
function App() {
    
  return (
   <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/Employee" element={<Crud />}></Route>
        </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
