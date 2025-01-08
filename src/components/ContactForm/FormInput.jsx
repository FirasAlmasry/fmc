import React, { forwardRef } from 'react';
import { InputLabel, Select, MenuItem, Typography, TextField, Box, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PhoneInput from './PhoneInput';
import PasswordInput from './PasswordInput';
import InputFileUpload from './InputFileUpload';
import { countries } from '../../constants/countres';
import i18next from 'i18next';
import linkIcon from './../../assets/icons/Vector.png'

const FormInput = forwardRef(({
    label,
    placeholder,
    type,
    labelImage,
    labelBioImage,
    selectedCountryCode = countries[0].phone,
    setSelectedCountryCode = countries[0].phone,
    phoneNumber,
    setPhoneNumber,
    maxLength,
    handleKeyUp,
    labelBio,
    textareaRows = '150px',
    width,
    borderRadius,
    sx,
    selectedValue,
    handleSelectChange,
    options = [],
    name = type,
    onChange,
    value
}, ref) => {
    const theme = useTheme();
    let lng = i18next.language
    const baseUrl = "www.fasterlink.me/";

    return (
        <>
            <InputLabel htmlFor={label} sx={{ my: 1, fontWeight: 'bold', color: theme.palette.primary.default }}>
                {label}
            </InputLabel>
            {labelBio && (
                <InputLabel htmlFor={label} sx={{ mb: 1, fontWeight: 'bold', color: theme.palette.secondary.default, fontSize: '0.75rem' }}>
                    {labelBio}
                </InputLabel>
            )}
            {type === 'tel' ? (
                <PhoneInput
                    type={type}
                    selectedCountryCode={selectedCountryCode}
                    setSelectedCountryCode={setSelectedCountryCode}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    placeholder={placeholder}
                />
            ) : type === 'password' ? (
                <PasswordInput type={type} placeholder={placeholder} onChange={onChange} name={name} />
            ) : type === 'url' ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme.palette.background.input,
                        borderRadius: 1,
                        border: `1px solid ${theme.palette.divider}`,
                        padding: '4px 8px',
                        flexDirection: lng === 'ar' ? 'row': "row-reverse",
                        ...sx,
                    }}
                >
                    <TextField
                        required
                        ref={ref}
                        id={label}
                        placeholder={placeholder}
                        type="text"
                        name={name}
                        value={value}
                        onChange={onChange}
                        fullWidth
                        className='input'
                        InputProps={{
                            sx: {
                                backgroundColor: 'transparent',
                                border: 'none',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none',
                                    p: 0
                                },
                            },
                        }}
                        sx={{
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: 0,
                                textAlign: 'left',
                                height: '6px',
                                color: '#3c1fab',
                                // fontWeight: 'bold',
                                '&::placeholder': {
                                    textAlign: 'left',
                                },
                            },
                        }}
                    />
                    <Typography
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            padding: '0 8px',
                            color: theme.palette.text.secondary,
                            // fontWeight: 'bold',
                            userSelect: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <bdi>{baseUrl}</bdi>
                        <CardMedia component={'img'} src={linkIcon} sx={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                    </Typography>
                </Box>
            ) : type === 'message' ? (
                <textarea
                    required
                    style={{ backgroundColor: theme.palette.background.input, height: textareaRows, padding: '20px', resize: 'none' }}
                    id={label}
                    multiline={'true'}
                    rows={6}
                    placeholder={placeholder}
                    name={name}
                    onChange={onChange}
                    value={value}
                    className='input'
                />
            ) : type === 'file' ? (
                <InputFileUpload labelImage={labelImage}
                    labelBioImage={labelBioImage}
                    width={width}
                    value={value}
                    name={name}
                    borderRadius={borderRadius} onChange={onChange} />
            ) : type === 'select' ? (
                <Select
                    value={selectedValue}
                    onChange={handleSelectChange}
                    displayEmpty
                    sx={{
                        width: '100%',
                        mt: 1,
                        backgroundColor: theme.palette.background.input,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .MuiSelect-icon': { paddingRight: 0, right: lng === 'ar' ? { md: '95%', xs: '90%' } : '5%' },
                        paddingRight: 0,
                        minWidth: '80px',
                        height: '40px',
                        ...sx
                    }}
                >
                    {options?.map((option) => (
                        <MenuItem key={option.id} value={`${option.id}`}>
                            <Typography variant="body2">{option.name}</Typography>
                        </MenuItem>
                    ))}
                </Select>
            ) : (
                <input
                    required
                    ref={ref}
                    style={{ backgroundColor: theme.palette.background.input, ...sx }}
                    id={label}
                    placeholder={placeholder}
                    type={type}
                    name={name}
                    maxLength={maxLength}
                    onKeyUp={handleKeyUp}
                    onChange={onChange}
                    value={value}
                    className='input'
                />
            )}
        </>
    );
});

export default FormInput;
