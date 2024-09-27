import React from "react";
import { Modal, TouchableOpacity } from "react-native";
import { StyledView } from "@/components/styleds/components";
import Icon from "react-native-vector-icons/Ionicons";

export interface ModalPageProps {
  isOpen: boolean;
  zIndex?: number;
  children: React.ReactNode;
  cN?: string;
  close: () => void;
}

export default function ModalPage({
  isOpen,
  zIndex = 10,
  children,
  cN,
  close,
}: ModalPageProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal transparent={true} visible={isOpen} animationType="slide">
      <StyledView className="flex-1 justify-end bg-[#D4D4D4] bg-opacity-50">
        {/* Fechar modal */}
        <TouchableOpacity
          style={{ position: "absolute", top: 40, left: 20, zIndex: 999 }}
          onPress={close}
        >
          <Icon name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <StyledView
          className={`relative z-${zIndex} w-full max-w-lg bg-white rounded-t-2xl p-6`}
          style={{ height: "80%" }}
        >
          {children}
        </StyledView>
      </StyledView>
    </Modal>
  );
}