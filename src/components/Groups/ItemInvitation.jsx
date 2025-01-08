import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { IconButton } from '@mui/material';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useAcceptInvite } from '../../hooks/groups/useAcceptInvite';
import { useRejectInvite } from '../../hooks/groups/useRejectInvite';

const ItemInvitation = ({ item }) => {

    const { acceptInvite, isPending} = useAcceptInvite()

    const { rejectInvite, isPending:isReject } = useRejectInvite()

    const handleAcceptInvite = (inviteId) => {
        acceptInvite(inviteId)
    }
    const handleRejectInvite = (inviteId) => {
        rejectInvite(inviteId)
    }
    const isSendData = isPending || isReject
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`;
    };
    
    return (
        <>
            <Card sx={{ width: 325 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Invite to the group {'name'}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Invitation from {'name'}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Invitation creation date <br/> {formatDate(item?.created_at)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing sx={{justifyContent:'space-between'}}>
                    <IconButton aria-label="reject" color={'error'} 
                        disabled={isSendData}
                        onClick={() =>handleRejectInvite(item?.id)}>
                        <ReportGmailerrorredIcon />
                    </IconButton>
                    <IconButton aria-label="accept" color={'success'} 
                        disabled={isSendData}
                        onClick={() =>handleAcceptInvite(item?.id)}>
                        <DoneAllIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </>
    )
}

export default ItemInvitation