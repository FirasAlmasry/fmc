import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormInput from '../../components/ContactForm/FormInput';
import Btn from '../../components/global/Btn';
import { useCreateGroup } from '../../hooks/groups/useCreateGroup';

const BoxWrap = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '8px',
    paddingTop: 0,
    borderRadius: '8px',
    width: '100%'
}));

const FormAddGroup = ({ currentData = {}, isEdit = false, handleCloseDialog }) => {
    const { createGroup, isPending } = useCreateGroup();
    const [formData, setFormData] = useState({name: ""});

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };
    useEffect(() => {
        if (isEdit && currentData) {
            setFormData({name: currentData.name || "",});
        }
    }, [isEdit, currentData]);
    const prepareData = () => {
        return {name: formData.name};
    };

    const SubmitForm = (e) => {
        e.preventDefault();
        const data = prepareData();
        createGroup(data, {
            onSuccess: () => {
                handleCloseDialog()
            },
        });
        e.target.reset()
    };
    return (
        <>
            <BoxWrap>
                <Box component={'form'} onSubmit={SubmitForm}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', m:2 }}>
                        <Box sx={{ width: '100%', textAlign: 'start' }}>
                                <FormInput
                                    type={'text'}
                                    name={`name`}
                                    label={`name`}
                                    labelBio={`add the group name`}
                                    value={formData.name}
                                    onChange={handleInputChange} />
                            
                        </Box>
                    </Box>
                    <Box my={2} textAlign={'center'}>
                        <Btn type='submit' widthMob='90%' disabled={isPending}>
                            {"save"}
                        </Btn>
                    </Box>
                </Box>
            </BoxWrap>

        </>
    );
};

export default FormAddGroup;
