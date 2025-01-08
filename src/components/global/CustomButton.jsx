import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, onClick, startIcon, endIcon, color = 'primary', variant = 'contained', sx }) => {
    return (
        <Button
            variant={variant}
            color={color}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{'.MuiButton-endIcon':{m:0}, ...sx}}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
