import React from 'react';
import {
    Button,
    TextField,
    Grid,
    Container,
    Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { call } from './ApiServer';
export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const email = data.get("email");
    const password = data.get("password");

    let userDTO = {
        "username" : username,
        "email" : email,
        "password" : password
    }

    call("/auth/signup", "POST",userDTO).then((response) => {
        if (response.id !== ""){
            navigate("/");
        }
    });

  }
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
       <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                계정 생성
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="유저 이름"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="패스워드"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: '#1976d2' , color :'#fff' }}
              >
                계정 생성
              </Button>
            </Grid>
        </Grid>
 
       </form>
    </Container>
  )
}
