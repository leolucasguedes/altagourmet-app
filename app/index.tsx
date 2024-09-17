// app/index.tsx
import React from 'react';
import { StyledPressable, StyledScrollView, StyledText, StyledView } from '@/components/styleds/components';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <>
            <StyledScrollView className="min-h-screen bg-white mb-20" contentContainerStyle={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }}>
                <StyledView className='w-full h-[60vh] rounded-b-full overflow-hidden'>
                    <LinearGradient
                        colors={['#238878', '#5ECD81', '#238878']}
                        style={styles.background}
                    />
                </StyledView>
                <StyledView>
                    <Link href="/login" className="w-full bg-light-green h-full flex justify-center items-center text-3xl text-white px-6 py-2 mt-3 rounded">
                        Comece Agora
                    </Link>
                </StyledView>
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