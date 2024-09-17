import React from 'react';
import { Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';


const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

export default function HelpScreen() {
    return (
        <>
            <StyledScrollView className="min-h-screen bg-body" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledText>Help</StyledText>
            </StyledScrollView>
        </>
    );
}
