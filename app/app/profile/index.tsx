import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledScrollView,
  StyledText,
  StyledPressable,
} from "@/components/styleds/components";
import ProfileHead from "@/components/profileHead";
import Popup from "@/components/popup";
import useAuthStore from "@/store/authStore";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconE from "react-native-vector-icons/Entypo";
import IconI from "react-native-vector-icons/MaterialIcons";

export default function ProfilePage() {
  const { logout, user } = useAuthStore();
  const [logoutdialog, setLogoutDialog] = useState(false);
  const router = useRouter();

  return (
    <>
      <Popup
        show={logoutdialog}
        status={"cancel"}
        title="Você está prestes a sair!"
        actions={[
          {
            action: () => {
              logout();
              router.push("/");
            },
            label: "Fazer logout",
            type: "primary",
          },
          {
            action: () => setLogoutDialog(false),
            label: "Cancelar",
            type: "secondary",
          },
        ]}
        Subtitle={() => (
          <StyledText className="text-xs text-error">
            Tem certeza de que deseja continuar?
          </StyledText>
        )}
        close={() => setLogoutDialog(false)}
      />

      <StyledView className="flex flex-col items-center justify-start w-full px-2">
        <StyledView className="w-full flex flex-row items-center justify-between gap-x-3 px-2 pt-4">
          <StyledPressable onPress={() => router.back()} className="w-20" >
            <Icon name="arrow-back" size={25} color="#0A0A0A" />
          </StyledPressable>
          <StyledText className="font-bold text-lg">
            Meu Perfil
          </StyledText>
          <StyledView className="w-20"></StyledView>
        </StyledView>

        <ProfileHead />

        <StyledView className="flex flex-col w-full mt-2 px-5">
          <StyledPressable
            onPress={() => router.push("/app/profile/edit")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="account-circle-outline" size={30} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">
                Editar Perfil
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => router.push("/app/favorites")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="heart-outline" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">
                Meus Favoritos
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => router.push("/app/chat")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconE name="chat" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">
                Minhas conversas
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => router.push("/")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="piggy-bank-outline" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">Pagamentos</StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => router.push("/app/security")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="shield-account-outline" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">Segurança</StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => router.push("/app/terms")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="file-document-edit" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">
                Termos e Condições
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>

          <StyledPressable
            onPress={() => setLogoutDialog(true)}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconI name="logout" size={27} color="#DC2626" />
              <StyledText className="font-normal text-base text-[#DC2626] ml-4">
                Logout
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable>
        </StyledView>
      </StyledView>
    </>
  );
}
