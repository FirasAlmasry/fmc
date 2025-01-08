import React from 'react'
import WrapperSection from '../global/WrapperSection'
import { Box, Skeleton } from '@mui/material'
import styled from 'styled-components'
import ItemInvitation from './ItemInvitation'
import EmptyContent from '../global/EmptyContent'

const BoxWrap = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '8px',
    padding: '16px 8px',
    paddingTop: 0,
    borderRadius: '8px',
    width: '100%',
}));
const ListInvitation = ({ invitation, isPending }) => {

    if (!invitation) return (<WrapperSection>
        <EmptyContent
            title={`You do not have any invitation.`} />
    </WrapperSection>)
    return (
        <>
            <WrapperSection>
                {isPending ? (
                    <BoxWrap>
                        {Array.from(new Array(6)).map((_, index) => (
                            <Skeleton animation="wave" key={index} height={150} width={250} />
                        ))}
                    </BoxWrap>
                ) : (
                    <BoxWrap>
                        {invitation?.map((item) =>
                            <ItemInvitation
                                key={item?.id}
                                item={item} />
                        )}
                    </BoxWrap>
                )}
            </WrapperSection>
        </>
    )
}

export default ListInvitation