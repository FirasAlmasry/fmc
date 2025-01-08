import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '@emotion/react';
const AuthSocial = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', }} >
        <Typography color='error' fontWeight={'bold'}>
          {"alert"}
        </Typography>
        <Box sx={{display:{md:'flex',xs:'initial'}, alignItems:'center', gap: { md: 1 ,xs:0}}} >
          <Typography color="error" variant={isMobile ? 'caption' : 'body1'} fontWeight={'bold'}>*</Typography>
          {'If you do not have an account'}
          <Typography sx={{ mx: 1 }} variant={isMobile ? 'caption' : 'body1'} component={Link} to={'/register'}> {"Cleek Here"}</Typography> 
          {'To Create a New Account'}
        </Box>
      </Box>
    </>
  )
}

export default AuthSocial