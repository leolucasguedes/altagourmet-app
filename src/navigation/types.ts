export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
    RegisterNumber: undefined;
    RegisterError: undefined;
    RegisterVerify: undefined;
    RegisterSuccess: undefined;
    ResetPassword: undefined;
    ResetPasswordChange: { token: string; email: string };
    ResetPasswordMethod: undefined;
    ResetPasswordSuccess: undefined;
    ResetPasswordVerify: undefined;
  };
  
  export type MainStackParamList = {
    Home: undefined;
    Profile: undefined;
    Terms: undefined;
  };
  