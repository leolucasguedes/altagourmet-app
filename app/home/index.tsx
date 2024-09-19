import React from 'react';
import { StyledImage, StyledScrollView, StyledText, StyledView } from '@/components/styleds/components';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import LogoIcon from '@/components/icons/logo';

export default function HomeScreen() {
    return (
        <>

            <StyledScrollView className="min-h-screen bg-white mb-20" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>

            </StyledScrollView >
        </>
    );
}
const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
});