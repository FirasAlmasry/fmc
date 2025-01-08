import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';

const SectionTitle = ({ title, color = "primary.default" }) => {
    const themeM = useTheme();
    const isMobile = useMediaQuery(themeM.breakpoints.down('sm'));
    return (
        <Typography variant={isMobile ? "h5" : 'h3'} gutterBottom align="center" color={color} sx={{fontWeight:'bold'}}>
            {title}
        </Typography>
    );
};

export default SectionTitle;
