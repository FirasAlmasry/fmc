import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModelAddUser from './ModelAddUser';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ group }) => {
    const { name, id, is_admin } = group
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedGroup, setSelectedGroup] = useState();
    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenAddUser = (groupId) => {
        handleClickOpenDialog();
        setSelectedGroup(groupId)
    }

    return (
        <>
            <Card sx={{ width: 325 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing >
                    <IconButton aria-label="show" onClick={() => navigate(`/group/${id}`)}>
                        <VisibilityIcon />
                    </IconButton>
                    {is_admin &&
                        <IconButton
                            onClick={() => handleOpenAddUser(id)}
                            aria-label="add to group">
                            <PersonAddIcon />
                        </IconButton>
                    }
                </CardActions>
            </Card>
            <ModelAddUser
                openDialog={openDialog}
                handleClickOpenDialog={handleClickOpenDialog}
                setOpenDialog={setOpenDialog}
                handleCloseDialog={handleCloseDialog}
                selectedGroup={selectedGroup} />
        </>
    )
}

export default ItemCard