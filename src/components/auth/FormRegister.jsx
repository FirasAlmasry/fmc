import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import Btn from '../global/Btn';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import FormInput from '../ContactForm/FormInput';
import { useAuthContext } from '../../auth/useAuthContext';
import { useNavigate } from 'react-router-dom';

const FormRegister = ({ currentData = {} }) => {
    const isEdit = Boolean(currentData?.id)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(true);

    const NewRegisterSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        password: Yup.string(),
    });
    const defaultValues = useMemo(
        () => ({
            name: currentData?.name || "",
            email: currentData?.email || "",
            password: currentData?.password || "",
        }),
        [currentData]
    );
    const { handleSubmit, reset } = useForm({
        resolver: yupResolver(NewRegisterSchema),
        defaultValues
    });
    useEffect(() => {
        if (isEdit && currentData) {
            setName(currentData?.name)
            setEmail(currentData?.email)
            setPassword(currentData?.password)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    const form = useRef();
    const navigate = useNavigate();
    const { register } = useAuthContext();
    const SubmitForm = async () => {
        try {
            const result = await register(name, email, password);
            console.log("🚀 ~ SubmitForm ~ result:", result)
            if (result.status === 200) {
                toast.success('register success');
                navigate(`/`);
            } else {
                toast.error(result.statusText);
            }
            reset();
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || "An unknown error occurred";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    return (
        <>
            <Box sx={{ p: { md: 4, xs: '0 8px' }, width: { md: '75%', xs: '100%' }, m: 'auto' }}>
                <>
                    <Box component={'form'} ref={form} onSubmit={handleSubmit(SubmitForm)}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            <Box sx={{ width: { md: '100%', xs: '100%' }, textAlign: 'start' }}>
                                <FormInput
                                    label={'Name'}
                                    type={'name'}
                                    placeholder={'Enter Name'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </Box>
                            <Box sx={{ width: { md: '100%', xs: '100%' }, textAlign: 'start' }}>
                                <FormInput
                                    label={'Email'}
                                    type={'email'}
                                    value={email}
                                    placeholder={'Enter Email'}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box sx={{ width: { md: '100%', xs: '100%' }, textAlign: 'start' }}  >
                                <FormInput label={'Create Password'}
                                    type={'password'}
                                    placeholder={'Enter your password'}
                                    name={'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </Box>
                            {!isEdit &&
                                <Box sx={{ width: { md: '100%', xs: '100%' }, textAlign: 'start', mt: 2 }}>
                                    <FormControlLabel sx={{ mr: 0 }} control={<Checkbox defaultChecked={isChecked} onChange={handleCheckboxChange} />} label={<Box>
                                        <Typography sx={{ mx: 1 }} variant='caption'> {'By Creating an Account, You Agree to'}</Typography>
                                        <Box>
                                            <Typography sx={{ mx: 1 }} variant='caption'> 
                                                {'Terms of Use '}</Typography>
                                            <Typography variant='caption' > {'Privacy Policy'}</Typography>
                                        </Box>
                                    </Box>} />
                                </Box>
                            }
                        </Box>
                        <Box mt={2} textAlign={'center'}>
                            <Btn type='submit' width='50%' widthMob='90%' disabled={!isChecked || loading}>
                                {loading ? 'Loading...' : 'next'}
                            </Btn>
                        </Box>
                    </Box>
                </>
            </Box>
        </>
    );
};

export default FormRegister;
