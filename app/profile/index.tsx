import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyledView,
  StyledScrollView,
  StyledText,
  StyledPressable,
} from "../../components/styleds/components";
import ProfileHead from "../../components/profileHead";
import Popup from "../../components/popup";
import useAuthStore from "../../store/authStore";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import IconI from "react-native-vector-icons/MaterialIcons";
import IconZ from "react-native-vector-icons/Zocial";
import VersionShower from "../../components/versionShower";

export default function ProfilePage() {
  const { logout, user, isAuthenticated } = useAuthStore();
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
      {user && isAuthenticated ? (
        <StyledScrollView
          className="flex-1 bg-white px-4"
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <StyledView className="w-full flex flex-row items-center justify-center gap-x-3 px-2">
            <StyledText className="font-semibold text-lg">
              Meu Perfil
            </StyledText>
          </StyledView>

          <ProfileHead />

          <StyledView className="flex flex-col w-full mt-2 px-5 mb-12">
            <StyledPressable
              onPress={() => router.push("/profile/edit")}
              className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2.5"
            >
              <StyledView className="flex flex-row items-center justify-start">
                <IconM
                  name="account-circle-outline"
                  size={30}
                  color="#0A0A0A"
                />
                <StyledText className="font-normal text-base ml-4">
                  Editar Perfil
                </StyledText>
              </StyledView>
              <IconM name="chevron-right" size={20} color="#A3A3A3" />
            </StyledPressable>

            <StyledPressable
              onPress={() => router.push("/favorites")}
              className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2.5"
            >
              <StyledView className="flex flex-row items-center justify-start">
                <IconM name="heart-outline" size={27} color="#0A0A0A" />
                <StyledText className="font-normal text-base ml-4">
                  Meus Favoritos
                </StyledText>
              </StyledView>
              <IconM name="chevron-right" size={20} color="#A3A3A3" />
            </StyledPressable>

            {/*
          <StyledPressable
            onPress={() => router.push("/terms")}
            className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2.5"
          >
            <StyledView className="flex flex-row items-center justify-start">
              <IconM name="file-document-edit" size={27} color="#0A0A0A" />
              <StyledText className="font-normal text-base ml-4">
                Termos e Condições
              </StyledText>
            </StyledView>
            <IconM name="chevron-right" size={20} color="#A3A3A3" />
          </StyledPressable> */}

            <StyledPressable
              onPress={() => setLogoutDialog(true)}
              className="flex flex-row items-center justify-between border-t-[1px] border-solid border-[#E8EDF2] py-2.5"
            >
              <StyledView className="flex flex-row items-center justify-start">
                <IconI name="logout" size={27} color="#DC2626" />
                <StyledText className="font-normal text-base text-[#DC2626] ml-4">
                  Logout
                </StyledText>
              </StyledView>
              <IconM name="chevron-right" size={20} color="#A3A3A3" />
            </StyledPressable>
            <StyledView className="w-full flex items-center justify-center py-4">
              <VersionShower />
            </StyledView>
          </StyledView>
        </StyledScrollView>
      ) : (
        <StyledView className="w-full h-full flex flex-col items-center justify-center">
          <IconZ name="guest" size={50} color="#5ECD81" />
          <StyledText className="font-semibold text-2xl mt-4">
            Olá, Visitante!
          </StyledText>
          <StyledPressable
            onPress={() => router.push("/register")}
            className="bg-[#5ECD81] rounded-md py-3 my-5 px-32"
          >
            <StyledText className="text-center text-white">
              Criar Conta
            </StyledText>
          </StyledPressable>
          <StyledPressable
            onPress={() => router.push("/login")}
            className="bg-[#5ECD81] rounded-md py-3 my-5 px-32"
          >
            <StyledText className="text-center text-white">
              Fazer Login
            </StyledText>
          </StyledPressable>
        </StyledView>
      )}
    </>
  );
}
