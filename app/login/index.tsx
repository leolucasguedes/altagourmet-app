import React from 'react';
import { StyledScrollView, StyledText } from '@/components/styleds/components';

export default function LoginScreen() {
    return (
        <>
            <StyledScrollView className="min-h-screen" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledText>Login screen - should not show footer</StyledText>
            </StyledScrollView>
        </>
    );
}