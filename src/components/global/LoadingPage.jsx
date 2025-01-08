import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100dvh' }}>
          <CircularProgress />
      </Box>
  )
}

export default LoadingPage