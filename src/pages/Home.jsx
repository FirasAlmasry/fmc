import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography } from '@mui/material';
import { useState } from 'react';
import ListGroups from '../components/Groups/ListGroups';
import Btn from '../components/global/Btn';
import ModelAddGroup from '../components/Groups/ModelAddGroup';
import { useInvites } from '../hooks/groups/useInvites';
import ListInvitation from '../components/Groups/ListInvitation';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Home = ({ selectedComponent }) => {

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { invites, isPending } = useInvites()

  return (
    <Box sx={{ display: 'flex', width:'100%' }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {selectedComponent === 'groups' &&
          <>
            <DrawerHeader sx={{ justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="h5" component="div">
                {'All Groups'}
              </Typography>
              <Btn onClick={handleClickOpenDialog}>Add Group</Btn>
            </DrawerHeader>
          <ListGroups />
            <ModelAddGroup
              openDialog={openDialog}
              handleClickOpenDialog={handleClickOpenDialog}
              setOpenDialog={setOpenDialog}
              handleCloseDialog={handleCloseDialog} />
          </>}
        {selectedComponent === 'invitation' &&
          <>
            <DrawerHeader>
              <Typography gutterBottom variant="h5" component="div">
                {'All Invitation'}
              </Typography>
            </DrawerHeader>
            <ListInvitation  
            invitation={invites?.data}
            isPending={isPending}
            />
          </>}
      </Box>
    </Box>
  )
}

export default Home