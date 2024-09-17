import React from 'react';
import { StyledScrollView, StyledText } from '@/components/styleds/components';

export default function OrdersPage() {
    return (
        <>
            <StyledScrollView className="min-h-screen" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledText>Pedidos</StyledText>
            </StyledScrollView>
        </>
    );
}