import React, { useState } from 'react';
import { TextField, Box, InputAdornment, FormControl, IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ type, placeholder, onChange, name }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: theme.palette.background.input }}>
                <TextField
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                                {/* الخط الرأسي بين الكود ورقم الهاتف */}
                                <Box
                                    sx={{
                                        width: '1px',
                                        height: '24px',
                                        backgroundColor: theme.palette.divider,
                                        mx: 1
                                    }}
                                />
                            </InputAdornment>
                        ),
                        endAdornment: ( // أيقونة القفل على اليمين
                            <InputAdornment position="start">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            paddingLeft: 0,
                            textAlign: 'left',
                            height: '10px',
                            '&::placeholder': {
                                textAlign: 'left',
                            },
                        }
                    }}
                    label="" 
                    name={name}
                    onChange={onChange}
                />
            </FormControl>
        </>
    )
}

export default PasswordInput;
