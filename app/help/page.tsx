import React from 'react';
import { Text, View, Image, Dimensions, ScrollView, Pressable } from 'react-native';
import { styled } from 'nativewind';


const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledPressable = styled(Pressable);
const StyledText = styled(Text);
const StyledImage = styled(Image);

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
