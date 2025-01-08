import React from 'react'
import { useGroups } from '../../hooks/groups/useGroups'
import ItemCard from './ItemCard'
import WrapperSection from '../global/WrapperSection'
import { Box, Skeleton } from '@mui/material'
import styled from 'styled-components'
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
const ListGroups = () => {

    const { groups, isPending } = useGroups()

    if (!groups?.data) return (<WrapperSection>
        <EmptyContent
            title={`You do not have any Group.`}
            description={`Go to add any new Group to your Account`} />
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
                        {groups?.data?.map((group) =>
                            <ItemCard key={group?.id} group={group} />
                        )}
                    </BoxWrap>
                )}
            </WrapperSection>
        </>
    )
}

export default ListGroups