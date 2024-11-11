import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledScrollView,
  StyledText,
  StyledTextInput,
  StyledImage,
  StyledPressable,
} from "../../components/styleds/components";
import Loading from "../../components/loading";
import Popup from "../../components/popup";
import LogoIcon from "../../components/icons/logo";
import useAuthStore from "../../store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { obterUrlBase } from "../../utils/textFormat";
import * as ImagePicker from "expo-image-picker";

export default function EditProfilePage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [address, setAddress] = useState("");

  const router = useRouter();

  function formatPhoneNumber(value: any) {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length <= 2) {
      return `+${phoneNumber}`;
    } else if (phoneNumber.length <= 4) {
      return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(2)}`;
    } else if (phoneNumber.length <= 9) {
      return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
        2,
        4
      )}) ${phoneNumber.slice(4)}`;
    }
    return `+${phoneNumber.slice(0, 2)} (${phoneNumber.slice(
      2,
      4
    )}) ${phoneNumber.slice(4, 9)}-${phoneNumber.slice(9, 13)}`;
  }

  const handleTelefoneChange = (text: string) => {
    setTelefone(formatPhoneNumber(text));
  };

  const sendRequest = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const reqBody = {
      name: nome !== "" ? nome : user?.name,
      email: email !== "" ? email : user?.email,
      phone: telefone !== "" ? telefone : user?.phone,
      address: address !== "" ? address : user?.address,
    };
    setLoading(false);
  };

  return (
    <StyledScrollView
      className="min-h-screen"
      contentContainerStyle={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginBottom: 80,
      }}
    >
      {loading && <Loading />}
      <Popup
        show={error}
        status={"cancel"}
        title={"Erro ao editar o perfil"}
        actions={[
          {
            action: () => setError(false),
            label: "Tentar novamente",
            type: "primary",
          },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs">
            Tente novamente mais tarde
          </StyledText>
        )}
        close={() => setError(false)}
      />
      <StyledView className="flex justify-start items-center mb-5">
        <StyledView className="w-full flex flex-row items-center justify-start gap-x-3 px-2 py-4">
          <StyledPressable onPress={() => router.back()} className="min-w-16">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
          <StyledText className="font-semibold text-lg pl-20">
            Editar Perfil
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="w-full px-4 mb-12">
        <StyledText className="text-xs font-semibold mb-2">
          Nome Completo
        </StyledText>
        <StyledTextInput
          value={nome}
          onChangeText={(text) => setNome(text)}
          placeholder="Nome"
          placeholderTextColor="#A3A3A3"
          className="border border-[#5ECD81] rounded-[4px] p-3 mb-4"
        />

        <StyledText className="text-xs font-semibold mb-2">Endereço</StyledText>
        <StyledTextInput
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholder="Endereço"
          placeholderTextColor="#A3A3A3"
          className="border border-[#5ECD81] rounded-[4px] p-3 mb-4"
        />

        <StyledText className="text-xs font-semibold mb-2">E-Mail</StyledText>
        <StyledTextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholder="E-Mail"
          placeholderTextColor="#A3A3A3"
          className="border border-[#5ECD81] rounded-[4px] p-3 mb-4"
        />

        <StyledText className="text-xs font-semibold mb-2">Telefone</StyledText>
        <StyledTextInput
          value={telefone}
          onChangeText={handleTelefoneChange}
          keyboardType="phone-pad"
          placeholder="(99) 99999-9999"
          placeholderTextColor="#A3A3A3"
          className="border border-[#5ECD81] rounded-[4px] p-3 mb-4"
        />

        <StyledPressable
          onPress={sendRequest}
          className="mt-4 mb-28 w-full bg-[#5ECD81] rounded-[4px] py-[12px]"
        >
          <StyledText className="text-white text-center">Salvar</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledScrollView>
  );
}
