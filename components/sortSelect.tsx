import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyledPressable, StyledText, StyledView } from "./styleds/components";
import { Modal, TouchableWithoutFeedback } from "react-native";
import useSearchStore from "../store/searchStore";

export default function SortSelect() {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const { setSortingOrder } = useSearchStore();

  const toggleSortModal = () => {
    setSortModalVisible((prev) => !prev);
  };

  const handleSort = (order: string) => {
    setSortingOrder(order);
    toggleSortModal();
  };

  return (
    <>
      {/* Botão de Ordenar */}
      <StyledPressable
        onPress={toggleSortModal}
        className="px-4 py-2 rounded-full border-[1px] border-[#8B8B93] mx-2 flex flex-row items-center space-x-2"
        style={{ position: "relative" }}
      >
        <StyledText className="text-[#8B8B93]">Ordenar Por</StyledText>
        <Icon
          name={sortModalVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={20}
          color="#8B8B93"
        />
      </StyledPressable>

      {/* Modal de ordenação */}
      {sortModalVisible && (
        <Modal
          transparent={true}
          animationType="none"
          visible={sortModalVisible}
        >
          <TouchableWithoutFeedback onPress={toggleSortModal}>
            <StyledView className="flex-1 justify-start items-start">
              <StyledView
                className="bg-white rounded-lg border-[1px] border-[#8B8B93] w-32"
                style={{
                  position: "absolute",
                  top: 160,
                  left: 52,
                  zIndex: 1000,
                }}
              >
                <StyledPressable onPress={() => handleSort("name")}>
                  <StyledText className="px-4 py-1.5">Nome</StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => handleSort("price_asc")}>
                  <StyledText className="px-4 py-1.5">Preço (Min)</StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => handleSort("price_desc")}>
                  <StyledText className="px-4 py-1.5">Preço (Max)</StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => handleSort("category")}>
                  <StyledText className="px-4 py-1.5">Categoria</StyledText>
                </StyledPressable>
                <StyledPressable onPress={() => handleSort("brand")}>
                  <StyledText className="px-4 py-1.5">Marca</StyledText>
                </StyledPressable>
              </StyledView>
            </StyledView>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
}
