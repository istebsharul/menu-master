import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Router />
    </BrowserRouter>
    
  );
};

export default App;
                      
  