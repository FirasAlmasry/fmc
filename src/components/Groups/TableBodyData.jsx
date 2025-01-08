import { Checkbox, IconButton, TableBody, TableCell, TableRow } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteFile } from '../../hooks/files/useDeleteFile';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useAcceptFile } from '../../hooks/files/useAcceptFile';
const TableBodyData = ({ data, is_admin, statusFilter, selectedIds=[], setSelectedIds }) => {
    const is_free = statusFilter === 'free'
    const is_pending = statusFilter === 'pending'
    const navigate = useNavigate()
    const { deleteFile } = useDeleteFile()
    const { acceptFile } = useAcceptFile()


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
                        {is_free && (
                            <TableCell>
                                <Checkbox
                                    checked={selectedIds.includes(doc.id)}
                                    onChange={() => handleCheckboxToggle(doc.id)}
                                    color="primary"
                                />
                            </TableCell>
                        )}
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
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => deleteFile(doc.id)}>
                                    <DeleteForeverIcon />
                                </IconButton>
                            )}
                            {is_admin && is_pending && (
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
        </>
    )
}

export default TableBodyData