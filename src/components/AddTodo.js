import React from 'react'
import { TextField, Paper, Button, Grid } from '@material-ui/core';
export default function AddTodo({handleSave, title, setTitle}) {

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyEvent = (e) => {
    if (e.key === "Enter") {
      handleSave(title,e);
    }
  }
  
  return (
    <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
            <TextField
              placeholder="Add Todo here"
              fullWidth
              onChange={handleChange}
              onKeyPress={handleKeyEvent}
              value={title}
            />
          </Grid>
          <Grid xs={1} md={1} item>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={(e)=>{handleSave(title, e)}}
            >
              +
            </Button>
          </Grid>
        </Grid>
      </Paper>
  )
}
