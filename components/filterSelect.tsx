import React, { useState } from "react";
import ArrowDown from "./icons/arrow-down";
import TuneIcon from "./icons/tune";
import {
  StyledScrollView,
  StyledPressable,
  StyledText,
  StyledView,
} from "./styleds/components";
import { Modal, TouchableOpacity } from "react-native";
import useSearchStore from "@/store/searchStore";

export default function FilterSelect({
  openFilterModal,
}: {
  openFilterModal: () => void;
}) {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const { setSortingOrder } = useSearchStore();

  const openSortModal = () => {
    setSortModalVisible(true);
  };

  const closeSortModal = () => {
    setSortModalVisible(false);
  };

  const handleSort = (order: string) => {
    setSortingOrder(order);
    closeSortModal();
  };

  return (
    <StyledScrollView horizontal className="my-2 px-4">
      {/* Ordenar Por */}
      <StyledPressable
        onPress={openSortModal}
        className="px-6 py-2 rounded-full border-[1px] border-gray mx-2 flex flex-row items-center"
      >
        <StyledText>Ordenar Por</StyledText>
        <ArrowDown color="#8B8B93" rotate={false} />
      </StyledPressable>

      {/* Filtrar Por */}
      <StyledPressable
        onPress={openFilterModal}
        className="px-6 py-2 rounded-full border-[1px] border-gray mx-2 flex flex-row items-center"
      >
        <StyledText>Filtrar Por</StyledText>
        <TuneIcon />
      </StyledPressable>

      {/* Modal de ordenação */}
      {sortModalVisible && (
        <Modal transparent={true} animationType="slide">
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={closeSortModal}
          >
            <StyledView className="bg-white p-6 rounded-lg w-11/12">
              <StyledText className="font-bold text-lg mb-4">
                Ordenar Por:
              </StyledText>
              <StyledPressable onPress={() => handleSort("name")}>
                <StyledText>Nome</StyledText>
              </StyledPressable>
              <StyledPressable onPress={() => handleSort("price_asc")}>
                <StyledText>Preço (Menor)</StyledText>
              </StyledPressable>
              <StyledPressable onPress={() => handleSort("price_desc")}>
                <StyledText>Preço (Maior)</StyledText>
              </StyledPressable>
              <StyledPressable onPress={() => handleSort("category")}>
                <StyledText>Categoria</StyledText>
              </StyledPressable>
              <StyledPressable onPress={() => handleSort("brand")}>
                <StyledText>Marca</StyledText>
              </StyledPressable>
            </StyledView>
          </TouchableOpacity>
        </Modal>
      )}
    </StyledScrollView>
  );
}
