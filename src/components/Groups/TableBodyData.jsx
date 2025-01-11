import { Checkbox, IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteFile } from '../../hooks/files/useDeleteFile';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useAcceptFile } from '../../hooks/files/useAcceptFile';
import ModelAddFile from '../Documents/ModelChickOut';
import OutputIcon from '@mui/icons-material/Output';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
const TableBodyData = ({ data, is_admin, selectedIds = [], setSelectedIds,group_id }) => {

    const navigate = useNavigate()
    const { deleteFile } = useDeleteFile()
    const { acceptFile } = useAcceptFile()
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState();

    const handleClickOpenDialog = (id) => {
        setOpenDialog(true);
        setSelectedFile(id)
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Handle checkbox toggle
    const handleCheckboxToggle = (id) => {
        setSelectedIds((prevSelected) =>
            prevSelected?.includes(id)
                ? prevSelected.filter((selectedId) => selectedId !== id) // Remove ID if already selected
                : [...prevSelected, id] // Add ID if not already selected
        );
    };
    return (
        <>
            <TableBody>
                {data?.map((doc) => (
                    <TableRow key={doc.id}>

                        <TableCell>{doc.file_name}</TableCell>
                        <TableCell>{doc.status}</TableCell>
                        <TableCell>
                            <IconButton
                                aria-label="show"
                                onClick={() => navigate(`/file-details/${doc.id}`)}
                            >
                                <VisibilityIcon />
                            </IconButton>
                            {is_admin && (
                                <>
                                    <IconButton
                                        aria-label="show"
                                        onClick={() => navigate(`/${group_id}/details-user/${doc.id}`)}
                                    >
                                        <AdminPanelSettingsIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => deleteFile(doc.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </>
                            )}
                            {doc?.status === 'locked' && doc.is_locked_by_you && (
                                <IconButton
                                    aria-label="locked"
                                    onClick={() => handleClickOpenDialog(doc.id)}>
                                    <OutputIcon />
                                </IconButton>
                            )}
                            {doc?.status === 'free' && (

                                <Checkbox
                                    checked={selectedIds.includes(doc.id)}
                                    onChange={() => handleCheckboxToggle(doc.id)}
                                    color="primary"
                                />

                            )}
                            {is_admin && doc?.status === 'pending' && (
                                <IconButton
                                    aria-label="delete"
                                    color="success"
                                    onClick={() => acceptFile(doc.id)}>
                                    <CheckCircleTwoToneIcon />
                                </IconButton>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <ModelAddFile
                openDialog={openDialog}
                handleClickOpenDialog={handleClickOpenDialog}
                setOpenDialog={setOpenDialog}
                handleCloseDialog={handleCloseDialog}
                selectedFile={selectedFile} />
        </>
    )
}

export default TableBodyData