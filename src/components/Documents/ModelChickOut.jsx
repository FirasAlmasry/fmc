import React, { useState } from 'react';
import ModelDialog from '../global/ModelDialog';
import { Box, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Btn from '../global/Btn';
import { useChickOut } from '../../hooks/files/useChickOut';

const ModelAddFile = ({ openDialog, handleClickOpenDialog, setOpenDialog, handleCloseDialog, selectedFile }) => {
    console.log("🚀 ~ ModelAddFile ~ selectedFile:", selectedFile)
    const [file, setFile] = useState(null); // To store the uploaded file
    const { chickOut, isPending: isSending } = useChickOut(selectedFile);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Save the selected file
    };

    const prepareData = () => {
        const formData = new FormData();
        formData.append('file', file); // Add the file to FormData
        return formData;
    };

    const sendData = () => {
        const data = prepareData();
        chickOut(data, {
            onSuccess: () => {
                handleCloseDialog(); // Close the dialog on success
            },
        });
    };

    return (
        <>
            <ModelDialog openDialog={openDialog} handleClickOpenDialog={handleClickOpenDialog} setOpenDialog={setOpenDialog}>
                <DialogContent
                    sx={{ padding: 0, backgroundColor: (theme) => theme.palette.background.date, height: '350px' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: (theme) => theme.palette.primary.text,
                            py: 1,
                            px: 2,
                            position: 'relative',
                        }}
                    >
                        <DialogTitle
                            id="responsive-dialog-title"
                            sx={{ color: '#000', textAlign: 'center' }}
                        >
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                            >
                                Upload File
                            </Box>
                        </DialogTitle>
                        <IconButton
                            onClick={handleCloseDialog}
                            sx={{ color: '#000', position: 'absolute', left: '10px' }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ width: '90%', m: '16px auto', textAlign: 'center' }}>
                        <TextField
                            type="file"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleFileChange}
                            sx={{
                                backgroundColor: '#fff',
                                borderRadius: '4px',
                                padding: '8px',
                            }}
                        />
                    </Box>
                    <Box my={2} textAlign={'center'}>
                        <Btn
                            type="submit"
                            widthMob="90%"
                            onClick={sendData}
                            disabled={isSending || !file} // Disable the button if no file is selected
                        >
                            {isSending ? 'Uploading...' : 'Upload'}
                        </Btn>
                    </Box>
                </DialogContent>
            </ModelDialog>
        </>
    );
};

export default ModelAddFile;
