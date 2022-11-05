import './App.css';
import React ,{useState} from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Layout from './pages/LayoutPage';
import TodoMain from './components/TodoMain';

function App() {

  const [userToken , setUserToken] = useState ("1");

  if(userToken === ""){
    return (
      <div className="app"> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
      </div>
    );
  }else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TodoMain setUserToken={setUserToken}/>} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
