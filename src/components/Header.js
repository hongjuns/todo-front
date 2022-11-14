import * as React from 'react';
import { useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { delUserToken } from '../reducer/authSlice'; 
export default function Header() {
  const isLogined = useSelector(state => state.auth.isLogined);
  const selectorState = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(delUserToken());
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <AdbIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </AdbIcon>
          <Typography variant="h6" align="left" component="div" sx={{ flexGrow: 1 }}>
           {isLogined ? selectorState.user.id + " TodoList" : "TodoList"}
          </Typography>
          {isLogined ? <Button color="inherit"   onClick={ handleLogOut} >LogOut</Button> : <Button color="inherit">Login</Button>}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
