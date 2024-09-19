import LogoIcon from "@/components/icons/logo";
import VerificationCodeInput from "@/components/verifyInput";
import { StyledText } from "@/components/styleds/components";

export default function RegisterVerify() {
  const codeValid = (code: string) => {
    return true;
  };
  return (
    <>
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl my-4">
        Verifique seu <StyledText className="font-bold">número</StyledText>
      </StyledText>
      <StyledText className="text-xs mb-4 text-center mobile:w-1/3">
        Enviamos um código de verificação{"\n"}para o e-mail informado.
      </StyledText>
      <VerificationCodeInput
        redirect="/register/success"
        codeValid={codeValid}
      />
    </>
  );
}
