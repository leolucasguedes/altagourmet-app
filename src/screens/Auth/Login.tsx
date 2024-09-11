import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styled } from 'nativewind';
import LogoComponent from '../../components/LogoComponent';
import PasswordInput from '../../components/PasswordInput';
import useAuthStore from '../../store/authStore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList, MainStackParamList } from '../../navigation/types';

type AuthNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
type MainNavigationProp = StackNavigationProp<MainStackParamList, 'Home'>;

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const LoginScreen: React.FC = () => {
  const { login, isAuthenticated } = useAuthStore();
  const authNavigation = useNavigation<AuthNavigationProp>();
  const mainNavigation = useNavigation<MainNavigationProp>();

  useEffect(() => {
    if (isAuthenticated) {
      mainNavigation.navigate('Home');
    }
  }, [isAuthenticated, mainNavigation]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    const logged = await login(email, password);
    if (logged.statusCode !== 200) {
      setError(true);
      Alert.alert('Erro', 'Usuário ou senha incorretos', [
        { text: 'Tentar Novamente', onPress: () => { setError(false); setPassword(''); } },
        { text: 'Redefinir senha', onPress: () => authNavigation.navigate('ResetPassword') }
      ]);
    } else {
      mainNavigation.navigate('Home');
    }
    setLoading(false);
  };

  return (
    <StyledView className="flex-1 items-center justify-center px-4 bg-white">
      {loading && <ActivityIndicator size="large" color="#BF3320" />}
      <LogoComponent color="#BF3320" size={120} />
      <StyledText className="text-2xl my-4">Faça seu <StyledText className="font-bold">login</StyledText>!</StyledText>
      <StyledView className="w-full">
        <StyledText className="text-xs font-semibold mb-3">E-mail</StyledText>
        <StyledTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          className="border border-grey w-full rounded py-4 px-3 mb-5 text-sm"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <StyledText className="text-xs font-semibold mb-3">Senha</StyledText>
        <PasswordInput withIcon placeholder="Digite sua senha" password={password} setPassword={setPassword} />
        <StyledTouchableOpacity onPress={() => authNavigation.navigate('ResetPassword')}>
          <StyledText className="text-dark-grey text-xs mt-2 text-right">Esqueceu sua senha?</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity onPress={handleLogin} className="bg-primary py-4 rounded mt-7">
          <StyledText className="text-white text-center">Entrar</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
      <StyledText className="text-dark-grey text-xs mt-4">
        Ainda não tem uma conta?{' '}
        <StyledTouchableOpacity onPress={() => authNavigation.navigate('Register')}>
          <StyledText className="text-primary font-semibold">Crie agora mesmo!</StyledText>
        </StyledTouchableOpacity>
      </StyledText>
    </StyledView>
  );
};

export default LoginScreen;
