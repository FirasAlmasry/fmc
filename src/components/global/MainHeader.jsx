import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'

const MainHeader = ({ image, title, description }) => {

    return (
        <>
            <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-evenly',
                flexDirection: 'column', m: 1, p: 2, textAlign: 'center'
            }}>
                <CardMedia
                    component={'img'}
                    src={image}
                    sx={{ width: '100px', height: '100px', objectFit:'contain' }}
                />
                <Typography color={'primary.default'} variant="h6" fontWeight={'bold'}>
                    {title}
                </Typography>
                <Typography color={'secondary.default'} variant='body2' fontWeight={'bold'}>
                    {description}
                </Typography>
            </Box>
        </>
    )
}

export default MainHeader