import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  styled,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useGroup } from '../hooks/groups/useGroup';
import LoadingPage from '../components/global/LoadingPage';
import WrapperSection from '../components/global/WrapperSection';
import EmptyContent from '../components/global/EmptyContent';
import Btn from '../components/global/Btn';
import ModelAddFile from '../components/Documents/ModelAddFile';
import { useParams } from 'react-router-dom';
import { useFiles } from '../hooks/files/useFiles';
import TableBodyData from '../components/Groups/TableBodyData';
import { useChickIn } from '../hooks/files/useChickIn';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Group = () => {

  const { id } = useParams();
  const {chickIn} = useChickIn()
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('free');
  const [selectedIds, setSelectedIds] = useState([]);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { group, isPending } = useGroup();
  const { files, isPending: isPendingFile } = useFiles({ group_id: id, status: statusFilter });

  if (isPending || isPendingFile) return <LoadingPage />

  if (!group?.data) return (<WrapperSection>
    <EmptyContent
      title={`You do not have any Documents or Members.`}
      description={`Go to add any new Documents or Members to your Group`} />
  </WrapperSection>)

  const { admin, documents, members, is_admin } = group.data;

  const prepareData = () => {
    return { documents_ids: selectedIds };
  };
  const sendData = () => {
    const data = prepareData();
    chickIn(data);
  };

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader sx={{ justifyContent: 'space-between' }}>
          <Typography gutterBottom variant="h5" component="div">
            Group Details
          </Typography>
          <Btn onClick={handleClickOpenDialog}>Add File</Btn>
        </DrawerHeader>
        <Box sx={{
          padding: 2,
          width: '90%',
          margin: 'auto',
          marginTop: 4,
        }}>
          {/* Group Information */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginBottom: 4,
              padding: 2,
            }}
          >
            <Typography variant="subtitle1">
              <strong>Admin Name:</strong> {admin?.name}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Admin Email:</strong> {admin?.email}
            </Typography>
          </Box>
          {/* Documents Table */}
          <Typography variant="h5" component="h2" gutterBottom>
            Documents
          </Typography>
          <Box sx={{display:'flex', justifyContent:'space-between'}}>
            {/* Filter */}
            {is_admin &&
              <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Status"
                >
                  <MenuItem value="free">All</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="locked">locked</MenuItem>
                </Select>
              </FormControl>
            }
            {statusFilter === 'free' &&
              <Btn onClick={sendData} sx={{my:1}}>Chick In</Btn>
            }
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {statusFilter === 'free' &&
                    <TableCell>
                      <strong>Select</strong>
                    </TableCell>
                  }
                  <TableCell>
                    <strong>File Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Actions</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBodyData
                data={is_admin ? files.data : documents}
                is_admin={is_admin}
                statusFilter={statusFilter}
                setSelectedIds={setSelectedIds}
                selectedIds={selectedIds}
              />
            </Table>
          </TableContainer>
          {/* Members */}
          {members && members.length > 0 && (
            <>
              <Typography variant="h5" component="h2" gutterBottom sx={{ marginTop: 4 }}>
                Members
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Email</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member, index) => (
                      <TableRow key={index}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Box>
      <ModelAddFile
        openDialog={openDialog}
        handleClickOpenDialog={handleClickOpenDialog}
        setOpenDialog={setOpenDialog}
        handleCloseDialog={handleCloseDialog}
        selectedGroup={id} />
    </>
  );
};

export default Group;
