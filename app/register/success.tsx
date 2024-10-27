import {
  StyledView,
  StyledText,
  StyledPressable,
} from "../../components/styleds/components";
import { useRouter } from "expo-router";
import LogoIcon from "../../components/icons/logo";

export default function RegisterSuccess() {
  const router = useRouter();

  return (
    <StyledView className="flex flex-1 items-center justify-center px-10">
      <LogoIcon fillColor="#238878" />
      <StyledText className="text-2xl mt-5 mb-2 font-bold">
        Parabéns!
      </StyledText>
      <StyledText className="text-xs mb-20 text-center w-5/6 px-2">
        Sua conta foi criada com sucesso. Agora você será direcionado para nossa
        Home. Boas compras!
      </StyledText>
      <StyledPressable
        className="bg-[#5ECD81] rounded-md py-4 mb-5 w-full flex justify-center items-center absolute bottom-10"
        onPress={() => router.push("/")}
      >
        <StyledText className="text-white">Continuar</StyledText>
      </StyledPressable>
    </StyledView>
  );
}
