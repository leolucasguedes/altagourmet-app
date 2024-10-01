import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledScrollView,
  StyledText,
  StyledTextInput,
  StyledImage,
  StyledPressable,
} from "../../../components/styleds/components";
import Loading from "../../../components/loading";
import Popup from "../../../components/popup";
import LogoIcon from "../../../components/icons/logo";
import useAuthStore from "../../../store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { obterUrlBase } from "../../../utils/textFormat";
import * as ImagePicker from "expo-image-picker";

export default function EditProfilePage() {
  const { user } = useAuthStore();
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [address, setAddress] = useState("");
  const [document, setDocument] = useState("");

  const router = useRouter();

  const handleSelecionarArquivo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagemBase64(result.assets[0].uri);
    }
  };

  useEffect(() => {
    if (user) {
      setNome(user.name);
      setEmail(user.email);
      setTelefone(formatPhoneNumber(user.phone) || "");
    }
  }, [user]);

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
      birth: nascimento !== "" ? nascimento : user?.birth,
      address: address !== "" ? address : user?.address,
      document: document !== "" ? document : user?.document,
      avatar: imagemBase64 ? imagemBase64 : user?.avatar,
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

        <StyledView className="h-[150px] w-[150px] bg-[#E8EDF2] rounded-full justify-center items-center">
          <StyledView className="h-[140px] w-[140px] bg-white rounded-full justify-center items-center overflow-hidden">
            {imagemBase64 ? (
              <StyledImage
                source={{ uri: imagemBase64 }}
                className="w-[130px] h-[130px]"
              />
            ) : user?.avatar &&
              !user.avatar.startsWith("https://ui-avatars.com/") ? (
              <StyledImage
                source={{
                  uri:
                    obterUrlBase(process.env.NEXT_PUBLIC_API_URL || "") +
                    "/storage/" +
                    user.avatar,
                }}
                className="w-[150px] h-[150px]"
              />
            ) : (
              <LogoIcon fillColor="#238878" />
            )}
          </StyledView>
        </StyledView>
        <StyledPressable
          onPress={handleSelecionarArquivo}
          className="mt-[-40px] bg-[#238878] p-[9px] rounded-[3px] ml-28"
        >
          <IconM name="file-edit-outline" size={15} color="white" />
        </StyledPressable>
      </StyledView>

      <StyledView className="w-full px-4">
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

        <StyledText className="text-xs font-semibold mb-2">
          Data de Nascimento
        </StyledText>
        <StyledTextInput
          value={nascimento}
          onChangeText={(text) => setNascimento(text)}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#A3A3A3"
          className="border border-[#5ECD81] rounded-[4px] p-3 mb-4"
        />

        <StyledText className="text-xs font-semibold mb-2">
          CPF
        </StyledText>
        <StyledTextInput
          value={document}
          onChangeText={(text) => setDocument(text)}
          placeholder="XXX.XXX.XXX-XX"
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
