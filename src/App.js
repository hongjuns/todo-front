import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Layout from './pages/LayoutPage';
import TodoMain from './components/TodoMain';

function App() {
  const isLogined = useSelector(state => state.auth.isLogined);

  if(!isLogined){
    return (
      <div className="app"> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      </div>
    );
  }else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoMain />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
