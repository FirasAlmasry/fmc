import React from 'react'
import { useMoveBack } from '../../hooks/useMoveBack';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@emotion/react';
import i18next from 'i18next';
import DarkModeToggle from "./DarkModeToggle";

const HeaderBack = ({ title, children }) => {
    const moveBack = useMoveBack();
    const theme = useTheme();
    let lng = i18next.language
    return (
        <div>
            <Box
                sx={{
                    display: { md: "flex", xs: "flex" },
                    justifyContent: "space-evenly",
                    width: "100%",
                    alignItems: 'center',
                    px:2,
                    py:1,
                    background: { md: 'transparent', xs: theme.palette.nav.main },
                    boxShadow: { md: 'none', xs: theme.palette.boxShadow } 
                }}>
                <IconButton onClick={moveBack} sx={{ display: { md: 'none', xs: 'unset' }, transform: lng === 'en' && 'rotate(180deg)'}}>
                    <ArrowForwardIosIcon sx={{ fill: theme.palette.primary.default }}/>
                </IconButton>
                <Typography sx={{flexGrow:1, textAlign:'center', fontWeight:'bold'}}>{title}</Typography>
                <DarkModeToggle />
                {children}
            </Box>
        </div>
    )
}

export default HeaderBack