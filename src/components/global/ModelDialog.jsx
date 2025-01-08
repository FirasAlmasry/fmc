import React from 'react'
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
const ModelDialog = ({ openDialog, setOpenDialog, children }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <div>
            <React.Fragment>
                <Dialog
                    fullWidth={fullScreen}
                    maxWidth={'xl'}
                    sx={{'.MuiDialog-paper':{borderRadius:'8px', width:'500px'}}}
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="responsive-dialog-title"> 
                    {children}
                </Dialog>
            </React.Fragment>
        </div>
    )
}

export default ModelDialog