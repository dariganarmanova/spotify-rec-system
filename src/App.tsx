import React from 'react';
import MainPage from '../src/components/MainPage'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import DashBoard from './components/DashBoard';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/home' element={<MainPage/>}/>
          <Route path='/spoti' element={<HomePage/>}/>
          <Route path='/dashboard' element={<DashBoard/>}/>
        </Routes>
      </Router>
  );
}

export default App;
