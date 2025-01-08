import React, { useState } from 'react'
import ModelDialog from '../global/ModelDialog'
import { Autocomplete, Box, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useUsers } from '../../hooks/users/useUsers';
import Btn from '../global/Btn';
import { useSendInvite } from '../../hooks/groups/useSendInvite';

const ModelAddUser = ({ openDialog, handleClickOpenDialog, setOpenDialog, handleCloseDialog, selectedGroup }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    // status=pending&
    const { users, isPending } = useUsers(selectedGroup)
    const { sendInvite, isPending: isSending } = useSendInvite();

    const prepareData = () => {
        return { group_id: selectedGroup, user_id: selectedUserId };
    };

    const sendData = () => {
        const data = prepareData();
        sendInvite(data, {
            onSuccess: () => {
                handleCloseDialog()
            },
        });
    };
    return (
        <>
            <ModelDialog openDialog={openDialog} handleClickOpenDialog={handleClickOpenDialog} setOpenDialog={setOpenDialog}>
                <DialogContent sx={{ padding: 0, backgroundColor: theme => theme.palette.background.date, height: '350px' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme => theme.palette.primary.text,
                            py: 1,
                            px: 2,
                            position: 'relative',
                        }}
                    >
                        <DialogTitle id="responsive-dialog-title" sx={{ color: '#000', textAlign: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >
                                Invite User
                            </Box>
                        </DialogTitle>
                        <IconButton onClick={handleCloseDialog} sx={{ color: '#000', position: 'absolute', left: '10px' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Autocomplete
                        disablePortal
                        options={users?.data || []}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        onChange={(event, value) => {
                            if (value) {
                                setSelectedUserId(value.id);
                            } else {
                                setSelectedUserId(null);
                            }
                        }}
                        renderOption={(props, option) => (
                            <li {...props}>
                                {option.email} ({option.name})
                            </li>
                        )}
                        sx={{ width: '90%', m: '16px auto' }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={isPending ? 'Loading...' : 'Users'}
                                placeholder="Search by name"
                            />
                        )}
                    />
                    <Box my={2} textAlign={'center'}>
                        <Btn type='submit' widthMob='90%'
                            onClick={sendData}
                            disabled={isSending}>
                            {"send"}
                        </Btn>
                    </Box>
                </DialogContent>
            </ModelDialog>
        </>
    )
}

export default ModelAddUser