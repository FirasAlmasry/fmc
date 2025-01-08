import React from 'react'
import { Box, Container, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';

const WrapperSection = ({ link, children, sx }) => {
  const themeM = useTheme();
  const isMobile = useMediaQuery(themeM.breakpoints.down('sm')); 
  return (
    <>
      <div id={link}>
        <Container maxWidth={'lg'}>
          <Box sx={{ my: { md: 2 ,xs:1}, display: 'flex', flexDirection: 'column', gap: { md: 1.7, xs: 1 }, alignItems: 'center', position: 'relative', zIndex: 11, textAlign: isMobile && 'center', ...sx }} >
            {children}
          </Box>
        </Container>
      </div>
    </>
  )
}

export default WrapperSection