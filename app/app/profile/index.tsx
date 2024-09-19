import React from 'react';
import { StyledScrollView, StyledText } from '@/components/styleds/components';

export default function ProfileScreen() {
    return (
        <>
            <StyledScrollView className="min-h-screen pt-10" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledText className='text-3xl'>Perfil</StyledText>
            </StyledScrollView>
        </>
    );
}