import React from 'react';
import { Box } from '@mui/material';
import MainHeader from '../global/MainHeader';
import iconRegister from './../../assets/auth/register.png';
import FormRegister from './FormRegister';

const StepsRegister = () => {
    return (
        <>
            <MainHeader
                image={iconRegister}
                title={'Create Account'}
                description={'To Create an Account for the First Time, Please Fill in the Following Fields'}
            />
            <Box sx={{ width: '100%' }}>
                <FormRegister />
            </Box>
        </>
    );
};

export default StepsRegister;
