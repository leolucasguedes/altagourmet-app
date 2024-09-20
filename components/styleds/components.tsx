import { Text, View, Image, ScrollView, Pressable, TextInput, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

export const StyledSafeAreaView = styled(SafeAreaView);
export const StyledView = styled(View);
export const StyledScrollView = styled(ScrollView);
export const StyledPressable = styled(Pressable);
let PoppinsTxt = styled(Text);
export const StyledText = ({ children, className, ...props }: { children: any, className?: string }) => <PoppinsTxt className={className + 'font-[Poppins]'} {...props}>{children}</PoppinsTxt>
export const StyledImage = styled(Image);
export const StyledTextInput = styled(TextInput);
export const StyledButton = styled(Button);
export const StyledTouchableOpacity = styled(TouchableOpacity);
