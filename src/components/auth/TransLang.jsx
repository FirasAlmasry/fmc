import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Menu, MenuItem, IconButton, useMediaQuery } from '@mui/material';
import i18next from 'i18next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@emotion/react';

export default function TransLang() {
    const { i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let lng = i18next.language;
    const themeM = useTheme();
    const isMobile = useMediaQuery(themeM.breakpoints.down('sm'));
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        handleMenuClose();
    };
    const toggleLanguage = () => {
        const otherLng = lng === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(otherLng);
    };
    return (
        <>
            {isMobile ? <Typography onClick={toggleLanguage} sx={{cursor:'pointer'}} color={'primary'} fontWeight={'bold'} variant='h6' >{lng === 'en' ? 'AR' : 'EN'}</Typography> :
                <>
                    <IconButton onClick={handleMenuOpen} color={'secondary.text'} sx={{ ':hover': { background: 'none' } }} >
                        <Typography color={'secondary.text'} fontWeight={'bold'} sx={{
                            fontSize: 18,
                            textTransform: 'capitalize',
                        }}>
                            {lng === 'en' ? 'العربية' : 'الانجليزية'}
                        </Typography>
                        <ExpandMoreIcon color={'secondary.text'} sx={{fill: theme => theme.palette.secondary.text }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={() => changeLanguage('ar')}>
                            العربية
                        </MenuItem>
                        <MenuItem onClick={() => changeLanguage('en')}>
                            English
                        </MenuItem>
                    </Menu>
                </>}
        </>
    );
}
