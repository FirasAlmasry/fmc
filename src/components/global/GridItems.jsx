import { Grid2 } from '@mui/material'
import React from 'react'
import styled from "styled-components";

const Empty = styled.p` 
      font-size: 1.6rem;
      font-weight: 500;
      text-align: center;
      margin: 2.4rem; 
    `; 
 
const GridItems = ({ data, slices, render }) => { 
    if (!data.length) return <Empty>No data to show at the moment</Empty>; 
    return (
        <>
            <Grid2 container justifyContent={'space-evenly'} width={'100%'}> 
                {slices ? data?.slice(0, slices)?.map(render) : data?.map(render)}
            </Grid2>
        </>
    )
}

export default GridItems