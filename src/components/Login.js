import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { call } from './ApiServer';
import { setUserToken } from '../reducer/authSlice'; 

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    let userDTO = {
      "email" : email,
      "password" : password
    }
    call("/auth/signin", "POST",userDTO)
      .then((response) => {
        if (response.token) {
          // token이 존재하는 경우 Todo 화면으로 리디렉트
          dispatch(setUserToken(response));
          localStorage.setItem("ACCESS_TOKEN",response.token);
          navigate("/");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h6" variant="h5">
            Todo Login
          </Typography>
        </Grid>
      </Grid>  
      <form noValidate onSubmit={handleSubmit}>
          {" "}
          {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
          <Grid container spacing={2}>
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
                로그인
              </Button>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}
