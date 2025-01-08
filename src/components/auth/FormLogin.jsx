import { Box, Checkbox, FormControlLabel } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-hot-toast';
import FormInput from '../ContactForm/FormInput'
import Btn from '../global/Btn'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../auth/useAuthContext'
import AuthSocial from './AuthSocial';

const FormLogin = () => {
    const form = useRef();
    const navigate = useNavigate();
    const NewLoginSchema = Yup.object().shape({
        email: Yup.string(),
        password: Yup.string(),
    });
    const { handleSubmit, reset } = useForm({
        resolver: yupResolver(NewLoginSchema),
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuthContext();
    // const default_page = localStorage.getItem('default_page');
    const SubmitForm = async () => {
        setLoading(true);
        try {
            const result = await login(email, password);
            if (result.status === 'success') {
                toast.success(result.message);
                navigate('/');
            } else {
                toast.error(result.message);
            }
            reset();
        } catch (err) {
            console.error("🚀 ~ SubmitForm ~ Error:", err);
            console.error("🚀 ~ Error Details:", err?.response || err.message);
            toast.error(err?.response?.data?.message || 'حدث خطأ في الشبكة');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box>
                <Box component={'form'} ref={form} onSubmit={handleSubmit(SubmitForm)}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        <Box sx={{ width: { md: '100%', xs: '100%' }, textAlign: 'start' }}>
                            <FormInput
                                label={'Enter Email'}
                                type={'email'}
                                value={email}
                                placeholder={`example@example.com`}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Box>
                        <Box sx={{ width: '100%', textAlign: 'start' }}  >
                            <FormInput
                                label={`Enter Password`}
                                type={'password'} placeholder={'*********'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </Box>
                        <Box sx={{ width: '100%', textAlign: 'start' }}  >
                            <FormControlLabel sx={{ mr: 0 }} control={<Checkbox defaultChecked />} label={'Remember Me'} />
                        </Box>
                    </Box>
                    <Box mt={2} textAlign={'center'}>
                        <Btn type='submit' width='500px' widthMob='90%' disabled={loading}>
                            {loading ? 'Loading...' : 'Log In'}
                        </Btn>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', textAlign: 'start', my: 2, px: 1 }}>
                    <AuthSocial />
                </Box>
            </Box>
        </>
    )
}

export default FormLogin