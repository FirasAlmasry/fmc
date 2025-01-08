import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Box,
} from '@mui/material';
// import { useParams } from 'react-router-dom';
import { useFile } from '../hooks/files/useFile';
import LoadingPage from '../components/global/LoadingPage';

const FileDetails = () => {

    // const { id } = useParams();

    const { file: fileData, isPending } = useFile();

    console.log("🚀 ~ FileDetails ~ fileData:", fileData)

    if (isPending) return <LoadingPage />

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                File Details: {fileData?.data?.file_name}
            </Typography>

            {/* Document Versions */}
            <Typography variant="h5" component="h2" gutterBottom>
                Document Versions
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Version ID</strong></TableCell>
                            <TableCell><strong>Download</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fileData?.data?.document_versions?.map((version, i) => (
                            <TableRow key={version.id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={version.file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default FileDetails;
