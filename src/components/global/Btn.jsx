import { useTheme } from '@emotion/react';
import { Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

const Btn = ({ type, bg = "secondary", startIcon, disabled, endIcon, width = 'fit-content', color, widthMob = 'fit-content', br, onClick, sx,children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <Button
            onClick={onClick}
            variant="contained"
            color={bg}
            startIcon={startIcon}
            endIcon={endIcon}
            disabled={disabled}
            type={type}
            sx={{
                padding: { md: '10px 50px', xs: 2 },
                fontWeight: 'bold', fontSize: '16px',
                borderRadius: '8px',
                color: color ? color : theme.palette.secondary.text,
                width: { md: width, xs: widthMob },
                border: br && `2px solid ${color ? color : theme.palette.primary.main}`,
                mx:2,
                height: '45px', '.MuiButton-endIcon': { mr: 1 },
                ...sx
            }}>
            <Typography variant={isMobile ? 'body1' : 'h6'} fontWeight={600} >
                {children}
            </Typography>
        </Button>
    )
}

export default Btn