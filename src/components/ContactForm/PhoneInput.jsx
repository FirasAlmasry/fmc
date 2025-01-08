import React from 'react';
import { TextField, MenuItem, Box, InputAdornment, Select, FormControl, Typography } from '@mui/material';
import { countries } from '../../constants/countres';
import { useTheme } from '@emotion/react';
import i18next from 'i18next';

const PhoneInput = ({ type, selectedCountryCode = countries[0].phone, setSelectedCountryCode, phoneNumber, setPhoneNumber, placeholder }) => {
    const theme = useTheme();
    let lng = i18next.language
    return (
        <>
            <FormControl fullWidth variant="outlined" sx={{ backgroundColor: theme.palette.background.input }}>
                <TextField
                    type="tel"
                    placeholder={placeholder}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Select
                                className='test'
                                    value={selectedCountryCode}
                                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                                    sx={{
                                        // إزالة السهم من الـ Select
                                        '& .MuiSelect-icon': { display: 'none', paddingRight: 0, },
                                        display: 'flex',
                                        paddingRight: 0,
                                        alignItems: 'center',
                                        mr: -1,
                                        minWidth: '80px',
                                        height: '40px',
                                        '& .MuiSelect-select': { paddingRight: '0 !important' },
                                        
                                    }}>
                                    {countries.map((country) => (
                                        <MenuItem key={country.code} value={country.phone} >
                                            <Box sx={{ display: 'flex', gap: 0.6, alignItems: 'center' }}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    height="20"
                                                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                                    alt=""
                                                    style={{
                                                        marginRight: '8px',
                                                        borderRadius: '50%'
                                                    }} />
                                                <Typography sx={{ color: '#a7a7a7' }}>{country.phone}+</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>

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
                    }}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            // '& fieldset': {
                            //     border: `1px solid ${theme.palette.primary.main}`, // البوردير حول TextField فقط
                            //     borderLeft: 'none', // إزالة الحدود على يسار الحقل حتى لا يظهر حول Select
                            // },
                            paddingLeft: 0,
                            textAlign: lng === 'ar' ? 'right' : 'left',
                            height: '10px',
                            '&::placeholder': {
                                textAlign: 'right',
                            },
                        },
                    }}
                    label="" 
                    name={type}
                />
            </FormControl>
        </>
    )
}

export default PhoneInput;
