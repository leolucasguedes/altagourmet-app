import { Text, View, Image, ScrollView, Pressable, TextInput, SafeAreaView, Button } from 'react-native';
import { styled } from 'nativewind';

let PoppinsTxt = styled(Text);

export const StyledSafeAreaView = styled(SafeAreaView);
export const StyledView = styled(View);
export const StyledScrollView = styled(ScrollView);
export const StyledPressable = styled(Pressable);
export const StyledText = ({ children, className, ...props }: { children: any, className?: string }) => <PoppinsTxt className={`font-poppins ${className}`} {...props}>{children}</PoppinsTxt>;
export const StyledImage = styled(Image);
export const StyledTextInput = styled(TextInput);
export const StyledButton = styled(Button);
