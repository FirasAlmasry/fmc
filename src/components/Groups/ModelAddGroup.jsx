import React from 'react'
import ModelDialog from '../global/ModelDialog'
import { Box, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import FormAddGroup from './FormAddGroup';

const ModelAddGroup = ({ openDialog, handleClickOpenDialog, setOpenDialog, handleCloseDialog }) => {
    return (
        <>
            <ModelDialog openDialog={openDialog} handleClickOpenDialog={handleClickOpenDialog} setOpenDialog={setOpenDialog}>
                <DialogContent sx={{ padding: 0, backgroundColor: theme => theme.palette.background.date }}>
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
                                Add Group
                            </Box>
                        </DialogTitle>
                        <IconButton onClick={handleCloseDialog} sx={{ color: '#000', position:'absolute', left:'10px' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    

                    <FormAddGroup handleCloseDialog={handleCloseDialog} />
                </DialogContent>
            </ModelDialog>
        </>
    )
}

export default ModelAddGroup