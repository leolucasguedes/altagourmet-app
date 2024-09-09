// app/index.tsx
import React from 'react';
import { StyledScrollView, StyledText } from '@/components/styleds/components';

export default function HomeScreen() {
    return (
        <>
            <StyledScrollView className="min-h-screen bg-body mb-20" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledText className='text-black'>HOME</StyledText>
            </StyledScrollView >
        </>
    );
}
