import React from 'react'
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
export default function Footer() {
  return (
    <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          hongjun Velog Todo, {new Date().getFullYear()}
          {"."}
      </Typography>
    </Box>
  )
}
