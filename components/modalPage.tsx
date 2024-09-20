import React from "react";
import { Modal, TouchableWithoutFeedback } from "react-native";
import { StyledView } from "@/components/styleds/components";

export interface ModalPageProps {
  isOpen: boolean;
  zIndex?: number;
  children: React.ReactNode;
  cN?: string;
}

export default function ModalPage({
  isOpen,
  zIndex = 10,
  children,
  cN,
}: ModalPageProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal transparent={true} visible={isOpen} animationType="fade">
      <TouchableWithoutFeedback>
        <StyledView className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <StyledView
            className={`relative ${
              cN ? cN : "z-10 w-11/12 max-w-lg bg-white rounded-lg p-4"
            } ${zIndex ? "z-" + zIndex : ""}`}
          >
            {children}
          </StyledView>
        </StyledView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
